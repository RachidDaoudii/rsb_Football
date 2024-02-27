import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { bcryptService } from '@app/common/helpers/bcrypt';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  AUTH_SERVICE,
  blogService,
  MANAGEMENTCLUB,
} from '@app/common/constant';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class UserService {
  constructor(
    @Inject(blogService) private readonly authClient: ClientProxy,
    @Inject(MANAGEMENTCLUB) private readonly managementClient: ClientProxy,

    private readonly userRepository: UserRepository,
    private readonly bcryptservice: bcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.bcryptservice.hash(
        createUserDto.password,
      );

      const user = await this.userRepository.create(createUserDto);

      if (!user) {
        return false;
      }

      // return this.managementClient.send('create-user-club', user);

      const requests = [];

      requests.push(
        this.managementClient.send('create-user-club', user).toPromise(),
      );

      requests.push(this.authClient.send('create-user-blog', user).toPromise());

      Promise.all(requests);

      return user;
    } catch (error) {
      return error.message;
    }
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne(email);
      if (!user) {
        return false;
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        return false;
      }

      return user;
    } catch (error) {
      return error;
    }
  }

  async findOneWithEmail(email: string) {
    return await this.userRepository.findOne(email);
  }
}
