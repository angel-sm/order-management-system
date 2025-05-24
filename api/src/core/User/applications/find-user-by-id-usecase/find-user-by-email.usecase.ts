/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrimitiveUser } from '../../domain/User.entity';
import { UserRepository } from '../../domain/User.repository';
import { OnEvent } from '@nestjs/event-emitter';
import { FindUserByEmailDto } from './find-user-by-email.dto';

interface Response {
  user: PrimitiveUser | null;
  error: string | null;
}

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  @OnEvent('user.sign-in')
  async run(dto: FindUserByEmailDto): Promise<Response> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      return {
        user: null,
        error: `Any user found with email ${dto.email}`,
      };
    }

    const primitiveUser = user.toPrimitive;
    return {
      user: primitiveUser,
      error: null,
    };
  }
}
