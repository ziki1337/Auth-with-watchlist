import { Injectable } from '@nestjs/common';
//import { users } from '../../moks'; //импорт наших данных
import { InjectModel } from '@nestjs/sequelize';
import { user } from './models/user.model';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO } from './dto';


@Injectable()
export class UsersService { 
  constructor(@InjectModel(user) private readonly userRepository: typeof user) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10)
  }


  async createUser(dto): Promise<CreateUserDTO>{ // npm i bcrypt библа для хэширования, npm i -D @types/bcrypt для типов тайпскрипта
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create(dto);
    return dto;
  } 
}