import type { Order } from "../domain/Order.entity";
import { OrderRepository } from "../domain/Order.repository";
import { api } from "../../shared/interceptors/jwt.interceptor";

export class AxiosRepository extends OrderRepository {
  async create(input: Order): Promise<void> {
    const data = {
      products: input.products,
      quantity: input.quantity,
      total: input.total,
      date: input.date,
      status: input.status,
    };

    await api.post("/orders", data);
  }
  async getById(id: string): Promise<Order | null> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  async search(): Promise<Order[]> {
    const orders = await api.get("/orders");
    const { data } = orders.data;
    return data;
  }
}
