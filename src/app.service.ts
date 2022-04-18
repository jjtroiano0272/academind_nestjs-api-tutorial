import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the [beginning] of the API! You\'re connected.';
  }
}
