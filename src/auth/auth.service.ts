import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) { }

  async signup(dto: AuthDto) {
    // Generate password hash
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        }
      });

      return this.signToken(user.id, user.email);
    }
    catch (error) {
      // Tried to create a new record with unique field
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken. Try again.');
        }
      };

      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      }
    });

    // !user => throw exception
    if (!user) { throw new ForbiddenException('Incorrect credentials'); }

    // compare password
    const pwMatch = await argon.verify(user.hash, dto.password);

    // !password => throw exception
    if (!pwMatch) {
      throw new ForbiddenException('Wrong password credentials!');
    }

    // if (user.email.length === 0) { throw new ForbiddenException('No user entered! Nobody home!'); }

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string; }> {
    const payload = {
      sub: userId,
      email
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload,
      {
        expiresIn: '15m',
        secret: secret,
      }
    );

    return { access_token: token };

  }
}