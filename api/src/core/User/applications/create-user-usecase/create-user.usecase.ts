/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrimitiveUser, User } from '../../domain/User.entity';
import { UserRepository } from '../../domain/User.repository';
import { EncryptorRepository } from 'src/shared/domain/encryptor.repository';
import { CreateUserDto } from './create-user.dto';
import { OnEvent } from '@nestjs/event-emitter';

interface Response {
  user: PrimitiveUser | null;
  error: string | null;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptorRepository: EncryptorRepository,
  ) {}

  @OnEvent('user.sign-up')
  async run(dto: CreateUserDto): Promise<Response> {
    const emailUsed = await this.userRepository.findByEmail(dto.email);

    if (emailUsed) {
      return {
        user: null,
        error: 'Email already taken',
      };
    }

    const user = User.create({
      email: dto.email,
      name: dto.name,
    });

    const hashPasswod = await this.encryptorRepository.encrypt(dto.password);
    user.password = hashPasswod;

    await this.userRepository.create(user);

    const primitiveUser = user.toPrimitive;
    user.password = '';
    return {
      user: primitiveUser,
      error: null,
    };
  }
}
