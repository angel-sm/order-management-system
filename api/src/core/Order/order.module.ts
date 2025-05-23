import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from './applications/create-order-usecase/create-order.usecase';
import { PostgresRepository } from './infrastructure/repositories/postgres.repository';
import { PrismaService } from 'src/shared/infrastructure/databases/prisma';
import { OrderRepository } from './domain/Order.repository';
import { CreateOrderController } from './infrastructure/api/controllers/create-order/create-order.controller';
import { SearchOrdersController } from './infrastructure/api/controllers/search-orders/search-orders.controller';
import { SearchOrdersUseCase } from './applications/search-orders-usecase/search-orders.usecase';
import { FindOrderByIdController } from './infrastructure/api/controllers/find-order-by-id/find-order-by-id.controller';
import { FindOrderByIdUseCase } from './applications/find-order-by-id-usecase/find-order-by-id.usecase';
import { CacheRepository } from 'src/shared/domain/cache.respository';
import { RedisRepository } from 'src/shared/infrastructure/repositories/redis.repository';
import { RedisModule } from 'src/shared/redis.module';
import { RabbitModule } from 'src/shared/rabbitmq.module';
import { RabbitRepository } from 'src/shared/infrastructure/repositories/rabbitmq.repository';
import { NotificationsRepository } from 'src/shared/domain/notifications.repository';

@Module({
  imports: [RedisModule, RabbitModule],
  controllers: [
    CreateOrderController,
    SearchOrdersController,
    FindOrderByIdController,
  ],
  providers: [
    CreateOrderUseCase,
    SearchOrdersUseCase,
    FindOrderByIdUseCase,
    PostgresRepository,
    RedisRepository,
    RabbitRepository,
    PrismaService,
    {
      provide: OrderRepository,
      useExisting: PostgresRepository,
    },
    {
      provide: CacheRepository,
      useExisting: RedisRepository,
    },
    {
      provide: NotificationsRepository,
      useExisting: RabbitRepository,
    },
  ],
  exports: [CreateOrderUseCase, SearchOrdersUseCase, FindOrderByIdUseCase],
})
export class OrderModule {}
