import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { AppError } from 'src/common/constants/error';
import { UserLoginDTO } from './dto';
import * as bcrypt from "bcrypt";
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly UserServise: UsersService,
        private readonly tokenService: TokenService
    ) { }

    async registerUsers (dto: CreateUserDTO): Promise<CreateUserDTO> {
        const existUser = await this.UserServise.findUserByEmail(dto.email);
        if (existUser) throw new BadRequestException(AppError.USER_EXIST) // BadRequestException выбрасывает ошибку
        return this.UserServise.createUser(dto);
    }

    async loginUser (dto:UserLoginDTO): Promise<any> {
        const existUser = await this.UserServise.findUserByEmail(dto.email);
        if(!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
        const validatePassword = await bcrypt.compare(dto.password, existUser.password);
        if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
        const user = await this.UserServise.publicUser(dto.email)
        const token = await this.tokenService.generateJwtToken(user);
        return {user, token};
    }
}
