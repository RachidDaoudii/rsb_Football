import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
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
  exports: [MailerModule],
})
export class MailModule {}
