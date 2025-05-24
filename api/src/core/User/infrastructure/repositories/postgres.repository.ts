import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/databases/prisma';
import { CreateDocumentError } from 'src/shared/infrastructure/errors/create-document.error';
import { NotFoundError } from 'src/shared/infrastructure/errors/not-found.error copy';
import { UserRepository } from '../../domain/User.repository';
import { User } from '../../domain/User.entity';

@Injectable()
export class PostgresRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(input: User): Promise<void> {
    try {
      const document = input.toPgDocument;

      await this.prisma.users.create({
        data: document,
      });
    } catch (error) {
      console.log(error);
      throw new CreateDocumentError(input.id, 'Order');
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      console.log('email', email);
      const document = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (!document) {
        throw new NotFoundError(email, 'User');
      }

      const user = User.create({
        id: document.id,
        email: document.email,
        name: document.name,
        createdAt: document.created_at,
        updatedAt: document.updated_at,
      });

      user.password = document.password;

      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Order not found');
    }
  }
}
