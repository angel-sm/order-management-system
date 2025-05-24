import { Body, Controller, Post } from '@nestjs/common';

import { SigninRoute } from '../../routes';
import { SigninDto } from './sign-in.dto';
import { SignInUseCase } from 'src/core/Auth/applications/sign-in-usecase/sign-in.usecase';

interface Response {
  message: string;
  data: string;
}

@Controller(SigninRoute)
export class SigninController {
  constructor(private readonly signinUsecase: SignInUseCase) {}

  @Post()
  async run(@Body() dto: SigninDto): Promise<Response> {
    const token = await this.signinUsecase.run({
      email: dto.email,
      password: dto.password,
    });
    return {
      message: 'User created',
      data: token.accessToken,
    };
  }
}
