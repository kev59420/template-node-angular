import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Request } from "express";
import { PayloadType } from "src/auth/types/payload.type";
import { Role } from "../enum/Role";
import { User } from "../models/user.entity";
import { EmailAlreadyExistException } from "src/core/exceptions/EmailAlreadyExist";

@Injectable()
export class UpdateUserUseCase{
  constructor(
    private readonly userSerivce: UserService
  ){}

  async updateUser(updateUserDto: UpdateUserDto, request: Request): Promise<User>{
    const payload = request['user'] as PayloadType
    const user = await this.userSerivce.getById(payload.sub)
    if(payload.role !== Role.ADMIN && payload.sub !== updateUserDto.id)
      throw new UnauthorizedException("Vous n'êtes pas admin ou l'utilisateur en question")
    if(payload.role !== Role.ADMIN && updateUserDto.role !== payload.role)
      throw new UnauthorizedException("Vous n'êtes pas admin vous ne pouvez pas modifier votre rôle")
    if(user.email !== updateUserDto.email && this.userSerivce.emailAlreadyExist(updateUserDto.email))
      throw new EmailAlreadyExistException(updateUserDto.email)
    return this.userSerivce.update(updateUserDto)
  }
}