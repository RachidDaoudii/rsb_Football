import { Module } from '@nestjs/common';

import { CommentModule } from '../comment/comment.module';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@app/common/helpers/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '../config';
import { User, Post, Category, Comment } from '../entities';
import * as Joi from 'joi';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL_BLOG: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([User, Post, Category, Comment]),
    PostModule,
    CommentModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class routerModule {}
