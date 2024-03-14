import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { bcryptService } from '@app/common';
import { ServiceJwt } from '../helpers/jwt/jwt.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from '../helpers/mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../config/database/database.module';
import { User } from './models/user.entity';
import { Role } from './models/role.entity';
import * as Joi from 'joi';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import {
  AUTH_SERVICE,
  blogService,
  MANAGEMENTCLUB,
  MARKETPLACE,
} from '@app/common/constant';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SECREtKEYJWT: Joi.string().required(),
        JwtExpireTime: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([User, Role]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('SECREtKEYJWT'),
        signOptions: { expiresIn: configService.getOrThrow('JwtExpireTime') },
      }),
    }),
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'sandbox.smtp.mailtrap.io',
    //     port: 2525,
    //     secure: false,
    //     auth: {
    //       user: 'f2d5933f5bde71',
    //       pass: '24aaf12cf0514d',
    //     },
    //   },
    //   defaults: {
    //     from: '"No Reply" <noreply@example.com>',
    //   },
    // }),
    ClientsModule.registerAsync([
      {
        name: blogService,
        useFactory: (configservice: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configservice.getOrThrow<string>('RaBbitMQ_URL')],
            queue: 'blog',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: MANAGEMENTCLUB,
        useFactory: (configservice: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configservice.getOrThrow<string>('RaBbitMQ_URL')],
            queue: 'managementclub',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: MARKETPLACE,
        useFactory: (configservice: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configservice.getOrThrow<string>('RaBbitMQ_URL')],
            queue: 'marketplace',
          },
        }),
        inject: [ConfigService],
      }
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    bcryptService,
    ServiceJwt,
    EmailService,
    LocalStrategy,
  ],
})
export class UserModule {}
