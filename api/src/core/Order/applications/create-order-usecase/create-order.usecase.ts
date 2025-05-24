import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/Order.repository';
import { CreateOrderDto } from './create-order.dto';
import { Order, PrimitiveOrder } from '../../domain/Order.entity';
import { CacheRepository } from 'src/shared/domain/cache.respository';
import { NotificationsRepository } from 'src/shared/domain/notifications.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cacheRepository: CacheRepository,
    private readonly notificationRepository: NotificationsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async run(dto: CreateOrderDto, user: string): Promise<PrimitiveOrder> {
    const order = Order.create({
      products: dto.products,
      quantity: dto.quantity,
      total: dto.total,
    });

    await this.orderRepository.create(order, user);

    await this.cacheRepository.set(`order:${order.id}`, order.toPrimitive);
    this.notificationRepository.notify('order_created', order.toPrimitive);

    return order.toPrimitive;
  }
}
