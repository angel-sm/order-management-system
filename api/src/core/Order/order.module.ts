import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from './applications/create-order-usecase/create-order.usecase';
import { PostgresRepository } from './infrastructure/repositories/postgres.repository';
import { PrismaService } from 'src/shared/infrastructure/databases/prisma';
import { OrderRepository } from './domain/Order.repository';
import { CreateOrderController } from './infrastructure/api/controllers/create-order/create-order.controller';
import { SearchOrdersController } from './infrastructure/api/controllers/search-orders/search-orders.controller';
import { SearchOrdersUseCase } from './applications/search-oriders-usecase/search-oriders.usecase';
import { FindOrderByIdController } from './infrastructure/api/controllers/find-order-by-id/find-order-by-id.controller';
import { FindOrderByIdUseCase } from './applications/find-order-by-id-usecase/find-order-by-id.usecase';

@Module({
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
    PrismaService,
    {
      provide: OrderRepository,
      useExisting: PostgresRepository,
    },
  ],
  exports: [CreateOrderUseCase, SearchOrdersUseCase, FindOrderByIdUseCase],
})
export class OrderModule {}
