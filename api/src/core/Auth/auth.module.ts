import { Module } from '@nestjs/common';
import { SignUpUseCase } from './applications/sign-up-usecase/sign-up.usecase';
import { SignUpController } from './infrastructure/api/controllers/sign-up/sign-in.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SigninController } from './infrastructure/api/controllers/sign-in/sign-in.controller';
import { SignInUseCase } from './applications/sign-in-usecase/sign-in.usecase';
import { BycryptModule } from 'src/shared/bycrypt.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    BycryptModule,
  ],
  controllers: [SignUpController, SigninController],
  providers: [SignUpUseCase, SignInUseCase, JwtStrategy],
  exports: [SignUpUseCase, SignInUseCase, PassportModule, JwtModule],
})
export class AuthModule {}
