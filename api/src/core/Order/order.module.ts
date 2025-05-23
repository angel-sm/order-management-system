import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from './applications/create-order-usecase/create-order.usecase';
import { PostgresRepository } from './infrastructure/repositories/postgres.repository';
import { PrismaService } from 'src/shared/infrastructure/databases/prisma';
import { OrderRepository } from './domain/Order.repository';
import { CreateOrderController } from './infrastructure/api/controllers/create-order/create-order.controller';

@Module({
  controllers: [CreateOrderController],
  providers: [
    CreateOrderUseCase,
    PostgresRepository,
    PrismaService,
    {
      provide: OrderRepository,
      useExisting: PostgresRepository,
    },
  ],
  exports: [CreateOrderUseCase],
})
export class OrderModule {}
