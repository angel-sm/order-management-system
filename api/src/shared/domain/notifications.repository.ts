export abstract class NotificationsRepository {
  abstract notify(topic: string, notification: any): void;
}
