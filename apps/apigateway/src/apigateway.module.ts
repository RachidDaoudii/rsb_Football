import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule ,ConfigService} from '@nestjs/config';
import * as Joi from 'joi';
import {
  AUTH_SERVICE,
  blogService,
  MANAGEMENTCLUB,
} from '@app/common/constant';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [],
  providers: [],
})
export class ApigatewayModule {}
