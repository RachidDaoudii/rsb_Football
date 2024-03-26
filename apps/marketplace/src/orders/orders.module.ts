import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { JwtService } from '@nestjs/jwt';
import {  EmailService, MailModule, ServiceJwt } from '@app/common';

@Module({
  imports: [MailModule],
  controllers: [OrdersController],
  providers: [OrdersService,OrdersRepository,JwtService,ServiceJwt ,EmailService],
})
export class OrdersModule {}
