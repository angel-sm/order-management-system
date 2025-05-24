/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SignupDto } from './sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/user.interface';

interface Response {
  accessToken: string;
  user: User;
}

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private jwtService: JwtService,
  ) {}

  async run(dto: SignupDto): Promise<Response> {
    const [response] = await this.eventEmitter.emitAsync('user.sign-up', dto);

    console.log('response', response);

    if (response.error) {
      throw new BadRequestException(response.error);
    }

    const user = response.user;

    const payload = { username: user.name, email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
