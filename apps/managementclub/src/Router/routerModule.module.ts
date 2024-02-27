import { Module } from '@nestjs/common';

import { DatabaseModule } from '../config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL_CLUB: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class RouterModule {}
