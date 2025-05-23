import { Module } from '@nestjs/common';
import { OrderModule } from './core/Order/order.module';

@Module({
  imports: [OrderModule],
})
export class AppModule {}
