import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './applications/create-user-usecase/create-user.usecase';
import { PostgresRepository } from './infrastructure/repositories/postgres.repository';
import { PrismaService } from 'src/shared/infrastructure/databases/prisma';
import { UserRepository } from './domain/User.repository';
import { BycryptModule } from 'src/shared/bycrypt.module';
import { FindUserByEmailUseCase } from './applications/find-user-by-id-usecase/find-user-by-email.usecase';

@Module({
  imports: [BycryptModule],
  controllers: [],
  providers: [
    CreateUserUseCase,
    FindUserByEmailUseCase,
    PostgresRepository,
    PrismaService,
    {
      provide: UserRepository,
      useExisting: PostgresRepository,
    },
  ],
  exports: [CreateUserUseCase, FindUserByEmailUseCase],
})
export class UserModule {}
