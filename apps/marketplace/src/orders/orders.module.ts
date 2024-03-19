import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
@Module({
  controllers: [OrdersController],
  providers: [OrdersService,OrdersRepository,JwtService,ServiceJwt],
})
export class OrdersModule {}
