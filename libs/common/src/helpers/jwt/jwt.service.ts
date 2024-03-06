import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class ServiceJwt {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: object) {
  
    const token = await this.jwtService.sign(payload, {
      secret: process.env.SECREtKEYJWT,
      expiresIn: '7day',
    });

    return token;
  }

  async verify(token: string) {
    return await this.jwtService.verify(token,{secret: process.env.SECREtKEYJWT});
  }

  async decode(token: string) {
    return await this.jwtService.decode(token);
  }
}
