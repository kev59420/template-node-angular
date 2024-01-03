import { HttpException, HttpStatus, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Request, Response } from 'express';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AuthStateDto, AuthType } from './dto/AuthStateDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string,response: Response) {
    const user = await this.userService.findByEmail(email);
    if(!user) throw new NotFoundException('L\'utilisateur n\'existe pas.')
    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) throw new UnauthorizedException('Mot de passe incorrect');
    const X_CSRF_TOKEN = crypto.randomBytes(128).toString('base64')
    const payload = { sub: user.id, role: user.role, csrf: X_CSRF_TOKEN };
    const access_token = await this.jwtService.signAsync(payload);
    const authState = new AuthStateDto(user,access_token,AuthType.AUTHENTICATED)
    response.cookie('X-JWT-Token',authState.jwt_token,{
      httpOnly: true,
      maxAge: 9000000
    })
    response.cookie('X-CSRF-Token',X_CSRF_TOKEN,{
      maxAge: 9000000
    })
    return authState
  }

  async getAuthState(request: Request): Promise<AuthStateDto>{
    const jwtToken = request.cookies['X-JWT-Token']
    if(!jwtToken) return new AuthStateDto(null,null,AuthType.ANONYMOUS)
    try{
      const payload = await this.jwtService.verifyAsync(jwtToken,{secret: process.env.JWT_SECRET})
      const user = await this.userService.getById(payload.sub);
      return new AuthStateDto(user,jwtToken,AuthType.AUTHENTICATED)
    }catch(e) {
      if(e instanceof TokenExpiredError){
        throw new HttpException('Timeout session',HttpStatus.FORBIDDEN)
      }
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined
  }
}
