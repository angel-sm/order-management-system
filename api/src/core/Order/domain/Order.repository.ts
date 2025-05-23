import { Order } from './Order.entity';

export abstract class OrderRepository {
  abstract create(input: Order): Promise<void>;
}
