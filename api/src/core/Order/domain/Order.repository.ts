import { Order } from './Order.entity';

export abstract class OrderRepository {
  abstract create(input: Order, user: string): Promise<void>;
  abstract search(user: string): Promise<Order[]>;
  abstract findById(id: string): Promise<Order>;
}
