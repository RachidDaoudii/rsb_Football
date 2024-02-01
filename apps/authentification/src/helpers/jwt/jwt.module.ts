import { Module } from '@nestjs/common';
import { JwtModule as ModuleJwt } from '@nestjs/jwt';

@Module({
  imports: [
    ModuleJwt.register({
      global: true,
      secret: process.env.SECREtKEYJWT,
      signOptions: { expiresIn: '2day' },
    }),
  ],
  exports: [ModuleJwt],
})
export class JwtModule {}
