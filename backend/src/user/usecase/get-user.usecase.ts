import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user.service";
import { PayloadType } from "src/auth/types/payload.type";
import { Role } from "../enum/Role";
import { Request } from "express";

@Injectable()
export class GetUserUseCase {
  constructor(
    private readonly userService: UserService
  ){}

  getUserById(id: number, request: Request){
    const payload = request['user'] as PayloadType
    if(payload.role !== Role.ADMIN && payload.sub !== id)
      throw new UnauthorizedException()
    return this.userService.getById(id)
  }
}