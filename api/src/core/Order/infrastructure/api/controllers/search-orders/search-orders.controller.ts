import { Controller, Get } from '@nestjs/common';

import { SearchOrdersRoute } from '../../routes';
import { PrimitiveOrder } from 'src/core/Order/domain/Order.entity';
import { SearchOrdersUseCase } from 'src/core/Order/applications/search-orders-usecase/search-orders.usecase';

interface Response {
  message: string;
  data: PrimitiveOrder[];
}

@Controller(SearchOrdersRoute)
export class SearchOrdersController {
  constructor(private readonly searchOrdersUsecase: SearchOrdersUseCase) {}

  @Get()
  async run(): Promise<Response> {
    const orders = await this.searchOrdersUsecase.run();
    return {
      message: 'Order listed',
      data: orders,
    };
  }
}
