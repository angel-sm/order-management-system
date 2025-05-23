import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/Order.repository';
import { PrimitiveOrder } from '../../domain/Order.entity';

@Injectable()
export class SearchOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async run(): Promise<PrimitiveOrder[]> {
    const orders = await this.orderRepository.search();
    return orders.map((order) => order.toPrimitive);
  }
}
