import { Body, Controller, Post } from '@nestjs/common';

import { SignupRoute } from '../../routes';
import { SignUpUseCase } from 'src/core/Auth/applications/sign-up-usecase/sign-up.usecase';
import { User } from 'src/core/Auth/domain/user.interface';
import { SignupDto } from './sign-in.dto';

interface Response {
  message: string;
  data: User;
}

@Controller(SignupRoute)
export class SignUpController {
  constructor(private readonly signupUsecase: SignUpUseCase) {}

  @Post()
  async run(@Body() dto: SignupDto): Promise<Response> {
    const user = await this.signupUsecase.run({
      email: dto.email,
      name: dto.name,
      password: dto.password,
    });
    console.log(user);
    return {
      message: 'User created',
      data: user,
    };
  }
}
