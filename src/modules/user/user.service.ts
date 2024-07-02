import { Injectable } from '@nestjs/common';
import { users } from '../../moks'; //импорт наших данных

@Injectable()
export class UsersService { 
  getUsers() {
    return users;
  }
}