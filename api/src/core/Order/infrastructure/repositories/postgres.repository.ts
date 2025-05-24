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

  async create(input: Order, user: string): Promise<void> {
    try {
      const document = input.toPgDocument;
      await this.prisma.orders.create({
        data: {
          ...document,
          user: {
            connect: { id: user },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new CreateDocumentError(input.id, 'Order');
    }
  }

  async search(user: string): Promise<Order[]> {
    try {
      const documents = await this.prisma.orders.findMany({
        where: {
          user: {
            id: user,
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });
      const orders = documents.map((doc) =>
        Order.create({
          id: doc.id,
          products: doc.products,
          quantity: doc.quantity,
          total: doc.total,
          date: doc.date,
          status: doc.status,
          createdAt: doc.created_at,
          updatedAt: doc.updated_at,
        }),
      );

      return orders;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id: string, user: string): Promise<Order> {
    try {
      const document = await this.prisma.orders.findUnique({
        where: {
          id,
          user: {
            id: user,
          },
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
