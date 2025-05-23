import { Order } from './Order.entity';

export abstract class OrderRepository {
  abstract create(input: Order): Promise<void>;
  abstract search(): Promise<Order[]>;
  abstract findById(id: string): Promise<Order>;
}
