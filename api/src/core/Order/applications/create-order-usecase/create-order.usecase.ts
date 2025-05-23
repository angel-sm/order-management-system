import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/Order.repository';
import { CreateOrderDto } from './create-order.dto';
import { Order, PrimitiveOrder } from '../../domain/Order.entity';
import { CacheRepository } from 'src/shared/domain/cache.respository';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cacheRepository: CacheRepository,
  ) {}

  async run(dto: CreateOrderDto): Promise<PrimitiveOrder> {
    const order = Order.create({
      products: dto.products,
      quantity: dto.quantity,
      total: dto.total,
    });
    await this.orderRepository.create(order);
    await this.cacheRepository.set(`order:${order.id}`, order.toPrimitive);
    return order.toPrimitive;
  }
}
