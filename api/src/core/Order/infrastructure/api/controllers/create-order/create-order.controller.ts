import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateOrderRoute } from '../../routes';
import { CreateOrderDto } from './create-order.dto';
import { PrimitiveOrder } from 'src/core/Order/domain/Order.entity';
import { CreateOrderUseCase } from 'src/core/Order/applications/create-order-usecase/create-order.usecase';
import { JwtAuthGuard } from 'src/core/Auth/infrastructure/guards/jwt-auth.guard';

interface Response {
  message: string;
  data: PrimitiveOrder;
}

@Controller(CreateOrderRoute)
export class CreateOrderController {
  constructor(private readonly createOrderUsecase: CreateOrderUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async run(@Body() dto: CreateOrderDto): Promise<Response> {
    const order = await this.createOrderUsecase.run(dto);
    return {
      message: 'Order created',
      data: order,
    };
  }
}
