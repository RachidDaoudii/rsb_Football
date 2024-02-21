import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from '../entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../config';
import * as Joi from 'joi';
import { JwtStrategy, LocalStrategy, RefreshJwtStrategy } from './strategies';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { bcryptService } from '@app/common';
import { ServiceJwt } from '../helpers/jwt/jwt.service';
import { EmailService } from '../helpers/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
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
    DatabaseModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('SECREtKEYJWT'),
        signOptions: { expiresIn: configService.getOrThrow('JwtExpireTime') },
      }),
    }),
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        secure: false,
        auth: {
          user: 'f2d5933f5bde71',
          pass: '24aaf12cf0514d',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),

    // AuthService,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    AuthService,
    UserService,
    UserRepository,
    bcryptService,
    ServiceJwt,
    EmailService,
  ],
})
export class AuthModule {}
