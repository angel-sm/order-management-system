import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { EncryptorRepository } from 'src/shared/domain/encryptor.repository';

@Injectable()
export class BycryptRepository extends EncryptorRepository {
  private readonly saltOrRounds: number;

  constructor() {
    super();
    this.saltOrRounds = 10;
  }

  async encrypt(data: string): Promise<string> {
    const hashPass = await bcrypt.hash(data, this.saltOrRounds);
    return hashPass;
  }

  async compareEncrypt(encryp: string, compareTo: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(encryp, compareTo);
    return isMatch;
  }
}
