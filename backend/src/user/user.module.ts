import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ValidationUserPipe } from './pipes/validation-user.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { CreateUserUseCase } from './usecase/create-user.usecase';
import { GetUserUseCase } from './usecase/get-user.usecase';
import { DeleteUserUseCase } from './usecase/delete-user.usecase';
import { UpdateUserUseCase } from './usecase/update-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ValidationUserPipe],
  exports: [UserService],
})
export class UserModule {}
