import { Inject, Injectable } from '@nestjs/common';
import { NotificationsRepository } from 'src/shared/domain/notifications.repository';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitRepository extends NotificationsRepository {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {
    super();
  }

  notify(topic: string, notification: any): void {
    this.rabbitClient.emit(topic, notification);
  }
}
