import { BadRequestException, Injectable } from '@nestjs/common';
//import { users } from '../../moks'; //импорт наших данных
import { InjectModel } from '@nestjs/sequelize';
import { user } from './models/user.model';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO } from './dto';
import { AppError } from 'src/common/constants/error';


@Injectable()
export class UsersService { 
  constructor(@InjectModel(user) private readonly userRepository: typeof user) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({where: {email}}); // findOne нужен для поиска одного параметра, в нашем случае: email
  }


  async createUser(dto): Promise<CreateUserDTO>{ // npm i bcrypt библа для хэширования, npm i -D @types/bcrypt для типов тайпскрипта
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create({
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password
    });
    return dto;
  } 
}