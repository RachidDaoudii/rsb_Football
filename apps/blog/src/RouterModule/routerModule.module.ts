import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { CommentModule } from '../comment/comment.module';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@app/common/helpers/jwt';
import { authService } from '@app/common/constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '../config';
import { User, Blog, Category, Comment } from '../entities';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL_BLOG: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([User, Blog, Category, Comment]),
    BlogModule,
    CommentModule,
    CategoryModule,
    UserModule,

    ClientsModule.registerAsync([
      {
        name: authService,
        useFactory: (configservice: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configservice.getOrThrow<string>('RaBbitMQ_URL')],
            queue: 'authentification',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class routerModule {}
