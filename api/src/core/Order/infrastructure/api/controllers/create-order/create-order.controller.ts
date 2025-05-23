import { Body, Controller, Post } from '@nestjs/common';

import { CreateOrderRoute } from '../../routes';
import { CreateOrderDto } from './create-order.dto';
import { PrimitiveOrder } from 'src/core/Order/domain/Order.entity';
import { CreateOrderUseCase } from 'src/core/Order/applications/create-order-usecase/create-order.usecase';

interface Response {
  message: string;
  order: PrimitiveOrder;
}

@Controller(CreateOrderRoute)
export class CreateOrderController {
  constructor(private readonly createOrderUsecase: CreateOrderUseCase) {}

  @Post()
  async run(@Body() dto: CreateOrderDto): Promise<Response> {
    const order = await this.createOrderUsecase.run(dto);
    return {
      message: 'Order created',
      order,
    };
  }
}
