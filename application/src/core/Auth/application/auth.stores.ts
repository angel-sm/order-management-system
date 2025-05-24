/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { AxiosRepository } from "../infrastructure/axios.repository.ts";

type State = {
  loading: boolean;
  error: string | null;
  user: any;
};

type Actions = {
  signin: (password: string, email: string) => Promise<void>;
  signup: (password: string, email: string, name: string) => Promise<void>;
};

const repository = new AxiosRepository();

export const useAuthStore = create<State & Actions>((set) => ({
  user: null,
  loading: false,
  error: null,
  signin: async (password: string, email: string) => {
    set({ loading: true, error: null });
    try {
      const response = await repository.signIn(email, password);
      const token = response.data;
      const user = response.user;
      window.localStorage.setItem("jwtToken", token);
      set({ loading: false, user });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error signing in",
        loading: false,
      });
    }
  },
  signup: async (password: string, email: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const response = await repository.signUp(email, password, name);

      const token = response.data.accessToken;
      window.localStorage.setItem("jwtToken", token);
      const user = response.data.user;

      set({ loading: false, user });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error signing up",
        loading: false,
      });
    }
  },
}));
