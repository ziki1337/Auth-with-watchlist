import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from './models/user.model';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [SequelizeModule.forFeature([user]), TokenModule], //SequelizeModule нужен для работы с запросами к бд
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UserModule {}
