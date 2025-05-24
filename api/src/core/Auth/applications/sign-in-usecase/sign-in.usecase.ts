/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SigninDto } from './sign-in.dto';
import { User } from '../../domain/user.interface';
import { EncryptorRepository } from 'src/shared/domain/encryptor.repository';
import { JwtService } from '@nestjs/jwt';

interface Response {
  accessToken: string;
}

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly encryptorRepository: EncryptorRepository,
    private jwtService: JwtService,
  ) {}

  async run(dto: SigninDto): Promise<Response> {
    console.log(1, dto);

    const [response] = await this.eventEmitter.emitAsync('user.sign-in', dto);

    if (!response) {
      throw new BadRequestException('Wrong credentials');
    }

    if (response.error) {
      throw new BadRequestException('Wrong credentials');
    }

    const user = response.user as User;

    const isPasswordCorrect = await this.encryptorRepository.compareEncrypt(
      dto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong credentials');
    }

    const payload = { username: user.name, email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
