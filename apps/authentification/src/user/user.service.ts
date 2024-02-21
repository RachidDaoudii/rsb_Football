import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { bcryptService } from '@app/common/helpers/bcrypt';
import { EmailService } from '../helpers/mail/mail.service';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
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
