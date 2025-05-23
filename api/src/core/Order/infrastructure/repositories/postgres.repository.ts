import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/Order.repository';
import { PrismaService } from '../../../../shared/infrastructure/databases/prisma';
import { Order } from '../../domain/Order.entity';
import { CreateDocumentError } from 'src/shared/infrastructure/errors/create-document.error';

@Injectable()
export class PostgresRepository extends OrderRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(input: Order): Promise<void> {
    try {
      const document = input.toPgDocument;
      await this.prisma.order.create({
        data: document,
      });
    } catch (error) {
      console.log(error);
      throw new CreateDocumentError(input.id, 'Order');
    }
  }
}
