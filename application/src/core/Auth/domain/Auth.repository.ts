/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class AuthRepository {
  abstract signIn(email: string, password: string): Promise<any>;
  abstract signUp(email: string, password: string, name: string): Promise<any>;
  abstract signOut(): Promise<any>;
}
