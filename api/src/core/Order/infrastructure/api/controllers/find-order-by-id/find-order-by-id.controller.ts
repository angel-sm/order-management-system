import { Controller, Get, Param } from '@nestjs/common';

import { FindOrderByIdRoute } from '../../routes';
import { PrimitiveOrder } from 'src/core/Order/domain/Order.entity';
import { FindOrderByIdUseCase } from 'src/core/Order/applications/find-order-by-id-usecase/find-order-by-id.usecase';
import { FindOrderByIdDto } from './find-order-by-id.dto';

interface Response {
  message: string;
  data: PrimitiveOrder;
}

@Controller(FindOrderByIdRoute)
export class FindOrderByIdController {
  constructor(private readonly findOrderByIdUsecase: FindOrderByIdUseCase) {}

  @Get()
  async run(@Param() dto: FindOrderByIdDto): Promise<Response> {
    const order = await this.findOrderByIdUsecase.run(dto);
    return {
      message: 'Order retrieved',
      data: order,
    };
  }
}
