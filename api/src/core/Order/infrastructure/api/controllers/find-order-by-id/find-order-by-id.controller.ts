import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { FindOrderByIdRoute } from '../../routes';
import { PrimitiveOrder } from 'src/core/Order/domain/Order.entity';
import { FindOrderByIdUseCase } from 'src/core/Order/applications/find-order-by-id-usecase/find-order-by-id.usecase';
import { FindOrderByIdDto } from './find-order-by-id.dto';
import { JwtAuthGuard } from 'src/core/Auth/infrastructure/guards/jwt-auth.guard';

interface Response {
  message: string;
  data: PrimitiveOrder;
}

@Controller(FindOrderByIdRoute)
export class FindOrderByIdController {
  constructor(private readonly findOrderByIdUsecase: FindOrderByIdUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async run(@Param() dto: FindOrderByIdDto): Promise<Response> {
    const order = await this.findOrderByIdUsecase.run(dto);
    return {
      message: 'Order retrieved',
      data: order,
    };
  }
}
