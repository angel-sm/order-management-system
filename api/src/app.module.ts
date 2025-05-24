/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderModule } from './core/Order/order.module';
import { UserModule } from './core/User/user.module';
import { AuthModule } from './core/Auth/auth.module';
@Module({
  imports: [
    OrderModule,
    UserModule,
    EventEmitterModule.forRoot() as any,
    AuthModule,
  ],
})
export class AppModule {}
