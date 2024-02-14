import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        DATABASE_URL_Auth: Joi.string().required(),
        DATABASE_URL_BLOG: Joi.string().required(),
        DATABASE_URL_CLUB: Joi.string().required(),
        DATABASE_URL_MARKETPLACE: Joi.string().required(),
        DATABASE_URL_RESERVATION: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
