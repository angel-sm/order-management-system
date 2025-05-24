import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/Order.repository';
import { PrimitiveOrder } from '../../domain/Order.entity';
import { FindOrderByIdDto } from './find-order-by-id.dto';
import { CacheRepository } from 'src/shared/domain/cache.respository';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cacheRepository: CacheRepository,
  ) {}

  async run(dto: FindOrderByIdDto, user: string): Promise<PrimitiveOrder> {
    const cachedOrder = await this.cacheRepository.get<PrimitiveOrder>(
      `${user}:order:${dto.id}`,
    );

    if (cachedOrder) return cachedOrder;

    const order = await this.orderRepository.findById(dto.id, user);
    return order.toPrimitive;
  }
}
