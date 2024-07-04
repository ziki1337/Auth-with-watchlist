import { Body, Controller, Delete, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service'; 
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}
  
  @ApiTags("API")
  @ApiResponse({status: 200, type: UpdateUserDto})
  @UseGuards(JwtAuthGuard)
  @Patch()
  upadateUser(@Body() updateDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
    const user = request.user;
    console.log(user);
    return this.usersService.updateUser(user.email, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.user;
    return this.usersService.deleteUser(user.email)
  }
}