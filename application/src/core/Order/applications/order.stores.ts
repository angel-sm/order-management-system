/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import type { Order } from '../domain/Order.entity.ts';
import { AxiosRepository } from '../infrastructure/axios.repository.ts';

type State = {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  error: string | null;
};

type Actions = {
  fetchOrders: () => Promise<void>;
  createOrder: (order: Order) => Promise<void>;
};

const repository = new AxiosRepository();

export const useOrderStore = create<State & Actions>((set) => ({
  order: null,
  orders: [],
  loading: false,
  error: null,
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await repository.search();
      set({ orders, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error fetching data',
        loading: false
      });
    }
  },
  createOrder: async (order: any) => {
    set({ loading: true, error: null });
    try {
      await repository.create(order);
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error creating order',
        loading: false
      });
    }
  }
}));