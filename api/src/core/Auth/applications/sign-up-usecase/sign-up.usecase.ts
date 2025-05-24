/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SignupDto } from './sign-up.dto';
import { User } from '../../domain/user.interface';

@Injectable()
export class SignUpUseCase {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async run(dto: SignupDto): Promise<User> {
    const [response] = await this.eventEmitter.emitAsync('user.sign-up', dto);

    console.log('response', response);

    if (response.error) {
      throw new BadRequestException(response.error);
    }

    return response.user as User;
  }
}
