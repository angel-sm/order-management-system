import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';

import { CreateOrderRoute } from '../../routes';
import { CreateOrderDto } from './create-order.dto';
import { PrimitiveOrder } from 'src/core/Order/domain/Order.entity';
import { CreateOrderUseCase } from 'src/core/Order/applications/create-order-usecase/create-order.usecase';
import { JwtAuthGuard } from 'src/core/Auth/infrastructure/guards/jwt-auth.guard';

interface Response {
  message: string;
  data: PrimitiveOrder;
}

interface AuthUser {
  user: {
    id: string;
    email: string;
  };
}

@Controller(CreateOrderRoute)
export class CreateOrderController {
  constructor(private readonly createOrderUsecase: CreateOrderUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async run(
    @Request() req: AuthUser,
    @Body() dto: CreateOrderDto,
  ): Promise<Response> {
    const { user } = req;

    if (!user) throw new Error('User not found');

    const order = await this.createOrderUsecase.run(dto, user.id);
    return {
      message: 'Order created',
      data: order,
    };
  }
}
