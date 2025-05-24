export abstract class EncryptorRepository {
  abstract encrypt(data: string): Promise<string>;
  abstract compareEncrypt(encryp: string, compareTo: string): Promise<boolean>;
}
