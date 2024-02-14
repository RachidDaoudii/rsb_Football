import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from './models/user.schema';
import { UserRepository } from './user.repository';
import { bcryptService } from '../helpers/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from '../helpers/mail/mail.service';

@Module({
  imports: [
    // DatabaseModule,
    // DatabaseModule.forFeature([
    //   { name: UserDocument.name, schema: UserSchema },
    // ]),
    JwtModule.register({
      global: true,
      secret: process.env.SECREtKEYJWT,
      signOptions: { expiresIn: '2day' },
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
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    bcryptService,
    JwtService,
    EmailService,
  ],
})
export class UserModule {}
