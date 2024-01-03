import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Request, Response, response } from 'express';
import { AuthStateDto } from './dto/AuthStateDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: AuthLoginDto, @Res({passthrough: true}) response: Response): Promise<AuthStateDto>{
    return this.authService.signIn(signInDto.email, signInDto.password,response);
  }

  @Get('state')
  getAuthState(@Req() request: Request): Promise<AuthStateDto>{
    return this.authService.getAuthState(request)
  }
}
