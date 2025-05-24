import { User } from './User.entity';

export abstract class UserRepository {
  abstract create(input: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User>;
}
