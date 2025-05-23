/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/Order.repository';
import { PrismaService } from '../../../../shared/infrastructure/databases/prisma';
import { Order } from '../../domain/Order.entity';
import { CreateDocumentError } from 'src/shared/infrastructure/errors/create-document.error';
import { NotFoundError } from 'src/shared/infrastructure/errors/not-found.error copy';

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

  async search(): Promise<Order[]> {
    try {
      const documents = await this.prisma.order.findMany();
      const oriders = documents.map((doc) =>
        Order.create({
          products: doc.products,
          quantity: doc.quantity,
          total: doc.total,
          date: doc.date,
          status: doc.status,
          createdAt: doc.created_at,
          updatedAt: doc.updated_at,
          id: doc.id,
        }),
      );

      return oriders;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id: string): Promise<Order> {
    try {
      const document = await this.prisma.order.findUnique({
        where: {
          id,
        },
      });

      if (!document) {
        throw new NotFoundError(id, 'Order');
      }

      return Order.create({
        products: document.products,
        quantity: document.quantity,
        total: document.total,
        date: document.date,
        status: document.status,
        createdAt: document.created_at,
        updatedAt: document.updated_at,
        id: document.id,
      });
    } catch (error) {
      console.log(error);
      throw new Error('Order not found');
    }
  }
}
