import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/Order.repository';
import { PrimitiveOrder } from '../../domain/Order.entity';
import { FindOrderByIdDto } from './find-order-by-id.dto';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async run(dto: FindOrderByIdDto): Promise<PrimitiveOrder> {
    const order = await this.orderRepository.findById(dto.id);
    return order.toPrimitive;
  }
}
