import { Controller, Body, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard) // Everything at the user level will require a token.
@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('me')
  getMe(
    @GetUser() user: User
  ) {
    return user;
  }

  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto
  ) {
    return this.userService.editUser(userId, dto);
  }
}
