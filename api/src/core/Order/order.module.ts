import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from './applications/create-order-usecase/create-order.usecase';
import { PostgresRepository } from './infrastructure/repositories/postgres.repository';
import { PrismaService } from 'src/shared/infrastructure/databases/prisma';
import { OrderRepository } from './domain/Order.repository';
import { CreateOrderController } from './infrastructure/api/controllers/create-order/create-order.controller';
import { SearchOrdersController } from './infrastructure/api/controllers/search-orders/search-orders.controller';
import { SearchOrdersUseCase } from './applications/search-oriders-usecase/search-oriders.usecase';

@Module({
  controllers: [CreateOrderController, SearchOrdersController],
  providers: [
    CreateOrderUseCase,
    SearchOrdersUseCase,
    PostgresRepository,
    PrismaService,
    {
      provide: OrderRepository,
      useExisting: PostgresRepository,
    },
  ],
  exports: [CreateOrderUseCase, SearchOrdersUseCase],
})
export class OrderModule {}
