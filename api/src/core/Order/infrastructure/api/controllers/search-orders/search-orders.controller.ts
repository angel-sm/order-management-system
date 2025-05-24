import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { SearchOrdersRoute } from '../../routes';
import { PrimitiveOrder } from 'src/core/Order/domain/Order.entity';
import { SearchOrdersUseCase } from 'src/core/Order/applications/search-orders-usecase/search-orders.usecase';
import { JwtAuthGuard } from 'src/core/Auth/infrastructure/guards/jwt-auth.guard';

interface Response {
  message: string;
  data: PrimitiveOrder[];
}

interface AuthUser {
  user: {
    id: string;
    email: string;
  };
}

@Controller(SearchOrdersRoute)
export class SearchOrdersController {
  constructor(private readonly searchOrdersUsecase: SearchOrdersUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async run(@Request() req: AuthUser): Promise<Response> {
    const { user } = req;

    if (!user) throw new Error('User not found');

    const orders = await this.searchOrdersUsecase.run(user.id);
    return {
      message: 'Order listed',
      data: orders,
    };
  }
}
