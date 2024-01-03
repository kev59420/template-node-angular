import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { EmailAlreadyExistException } from "src/core/exceptions/EmailAlreadyExist";
import { CreateUserDto } from "../dto/create-user.dto";
import { Role } from "../enum/Role";
import { User } from "../models/user.entity";
import { UserService } from "../user.service";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userService: UserService
  ){}

  async createUser(createUserDto: CreateUserDto){
    const emailALreadyExist = await this.userService.emailAlreadyExist(createUserDto.email)
    if(emailALreadyExist) throw new EmailAlreadyExistException(createUserDto.email)
    const user = new User()
    user.email = createUserDto.email
    user.firstName = createUserDto.firstName
    user.lastName = createUserDto.lastName
    user.password = await bcrypt.hash(createUserDto.password,10)
    user.role = Role.USER
    return this.userService.create(user)
  }
}