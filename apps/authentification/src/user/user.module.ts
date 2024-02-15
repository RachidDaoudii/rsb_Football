import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { bcryptService } from '@app/common';
import { ServiceJwt } from '../helpers/jwt/jwt.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from '../helpers/mail/mail.service';
import {
  PrismaModuleAuthentification,
  PrismaServiceAuthentification,
} from '@app/common/database/authentification';

import { JwtModule } from '@app/common/helpers/jwt';
// import { EmailService } from '@app/common/helpers/mail/mail.service';
@Module({
  imports: [
    PrismaModuleAuthentification,
    JwtModule,
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
  ],
  controllers: [UserController],
  providers: [
    PrismaServiceAuthentification,
    UserService,
    UserRepository,
    bcryptService,
    ServiceJwt,
    EmailService,
  ],
})
export class UserModule {}
