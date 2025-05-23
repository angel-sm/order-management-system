import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/Order.repository';
import { CreateOrderDto } from './create-order.dto';
import { Order, PrimitiveOrder } from '../../domain/Order.entity';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async run(dto: CreateOrderDto): Promise<PrimitiveOrder> {
    const order = Order.create({
      products: dto.products,
      quantity: dto.quantity,
      total: dto.total,
    });
    await this.orderRepository.create(order);
    return order.toPrimitive;
  }
}
