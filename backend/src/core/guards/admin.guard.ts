import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";
import { UserService } from "src/user/user.service";
import { User } from "src/user/models/user.entity";
import { Role } from "src/user/enum/Role";
import { PayloadType } from "src/auth/types/payload.type";

@Injectable()
export class AdminGuard implements CanActivate{
  constructor(){}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request
    const role = (request['user'] as PayloadType).role
    return role === Role.ADMIN
  }  
}