/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../shared/interceptors/jwt.interceptor";
import { AuthRepository } from "../domain/Auth.repository";

export class AxiosRepository extends AuthRepository {
  async signIn(email: string, password: string): Promise<any> {
    const { data } = await api.post("/sign-in", { email, password });
    return data;
  }

  async signUp(email: string, password: string, name: string): Promise<any> {
    const { data } = await api.post("/sign-up", { email, password, name });
    return data;
  }

  signOut(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
