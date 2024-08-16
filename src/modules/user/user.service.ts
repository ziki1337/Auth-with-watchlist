import { BadRequestException, Injectable } from '@nestjs/common';
//import { users } from '../../moks'; //импорт наших данных
import { InjectModel } from '@nestjs/sequelize';
import { user } from './models/user.model';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO, UpdateUserDto } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from '../auth/response';
//import { AppError } from 'src/common/constants/error';



@Injectable()
export class UsersService { 
  constructor(
    @InjectModel(user) private readonly userRepository: typeof user,
    private readonly tokenService: TokenService
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    }
    catch (e) {
      throw new Error(e);
    }
  }

  async findUserByEmail(email: string): Promise<user> {
    try {
      return this.userRepository.findOne({where: {email}, include: {
        model: Watchlist,
        required: false
      }}); // findOne нужен для поиска одного параметра, в нашем случае: email
    }
    catch (e) {
      throw new Error(e);
    }
  }


  async createUser(dto): Promise<CreateUserDTO>{ // npm i bcrypt библа для хэширования, npm i -D @types/bcrypt для типов тайпскрипта
    try {
      dto.password = await this.hashPassword(dto.password);
      await this.userRepository.create({
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password
    });
    return dto;
    }
    catch (e) {
      throw new Error(e);
    }
  } 

  async publicUser (email: string): Promise<AuthUserResponse> {
    try {
      const user =  await this.userRepository.findOne({
        where: {email},
        attributes:{exclude: ['password']},
        include: {
          model: Watchlist,
          required: false
        }
      })
      const token = await this.tokenService.generateJwtToken(user);
      return {user, token}
    }
    catch (e) {
      throw new Error(e);
    }
  }

  async updateUser (email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      await this.userRepository.update(dto, {where: {email}});
      return dto;
    }
    catch (e) {
      throw new Error(e);
    }
  }
  async deleteUser (email: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({where: {email}})
      return true;
    }
    catch (e) {
      await this.userRepository.destroy({where: {email}})
      return true;
    }
  }
}