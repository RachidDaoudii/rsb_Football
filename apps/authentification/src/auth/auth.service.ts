import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entities';
import { JwtService } from '@nestjs/jwt';
import { ServiceJwt, bcryptService } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: ServiceJwt,
    private readonly bcryptservice: bcryptService,
   
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithEmail(email);
    if (user && (await this.bcryptservice.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
    };

    return {
      ...user,
      accessToken:await  this.jwtService.sign(payload),
      refreshToken:await this.jwtService.sign(payload),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
    };

    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }
}
