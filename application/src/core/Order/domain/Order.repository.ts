import type { Order } from "./Order.entity";

export abstract class OrderRepository {
  abstract create(input: Order): Promise<void>;
  abstract getById(id: string): Promise<Order | null>;
  abstract search(): Promise<Order[]>;
}
