import { Module } from '@nestjs/common';
import { EncryptorRepository } from 'src/shared/domain/encryptor.repository';
import { BycryptRepository } from './infrastructure/repositories/bcrypt.repository';

@Module({
  providers: [
    {
      provide: EncryptorRepository,
      useClass: BycryptRepository,
    },
  ],
  exports: [EncryptorRepository],
})
export class BycryptModule {}
