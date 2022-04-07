import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // Create two endpoints (login: POST, signup: POST)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // return this.authService.signup(dto);
    return dto.email == 'zrdominguez1017@eagle.fgcu.edu' ? { msg: `Eyyyy! It's Zech!` } : this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

};
