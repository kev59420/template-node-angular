import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";
import { UserService } from "src/user/user.service";
import { PayloadType } from "../types/payload.type";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ){}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request
    const jwtToken = request.cookies['X-JWT-Token']
    const csrfToken = this.extractCsrfFromHeader(request)
    if(!jwtToken) throw new UnauthorizedException();
    
    try{
      const payload = await this.jwtService.verifyAsync(jwtToken,{secret: process.env.JWT_SECRET}) as PayloadType
      if(payload.csrf !== csrfToken) throw new UnauthorizedException();
      const user = await this.userService.getById(payload.sub)
      if(!user) throw NotFoundException
      request['user'] = payload;
    }catch(e) {
      if(e instanceof TokenExpiredError){
        throw new HttpException('Timeout session',HttpStatus.FORBIDDEN)
      }else{
        throw new UnauthorizedException();
      }
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined
  }

  private extractCsrfFromHeader(request: Request): string |undefined {
    return request.headers['x-csrf-token'] as string
  }
  
}