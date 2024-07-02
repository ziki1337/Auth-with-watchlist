import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service'; 

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}