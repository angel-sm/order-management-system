import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
