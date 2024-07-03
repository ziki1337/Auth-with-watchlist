import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service'; 
import { CreateUserDTO } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  createUsers(@Body() dto: CreateUserDTO) {
    console.log(dto);
    return this.usersService.createUser(dto);
  }
}