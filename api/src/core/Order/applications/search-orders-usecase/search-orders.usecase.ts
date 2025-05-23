import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/Order.repository';
import { PrimitiveOrder } from '../../domain/Order.entity';
import { CacheRepository } from 'src/shared/domain/cache.respository';

@Injectable()
export class SearchOrdersUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cacheRepository: CacheRepository,
  ) {}

  async run(): Promise<PrimitiveOrder[]> {
    const cachedOrders = await this.cacheRepository.getAll<string>('order:*');

    if (cachedOrders.length) {
      const cachedOrdersMap = cachedOrders.map(
        (order) => JSON.parse(order) as PrimitiveOrder,
      );
      return cachedOrdersMap;
    }

    const documents = await this.orderRepository.search();
    const orders = documents.map((order) => order.toPrimitive);

    if (orders.length) {
      await this.cacheRepository.setMany<PrimitiveOrder>(orders, 'order');
    }

    return orders;
  }
}
