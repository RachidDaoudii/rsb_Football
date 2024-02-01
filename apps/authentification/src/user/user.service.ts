import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { bcryptService } from '../helpers/bcrypt/bcrypt.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptservice: bcryptService,
    private readonly serviceJwt: JwtService,
    private readonly emailService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.bcryptservice.hash(
      createUserDto.password,
    );

    const user = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (user) {
      return {
        message: 'User already exists',
      };
    }

    const token = await this.serviceJwt.sign(
      {
        email: createUserDto.email,
        firstname: createUserDto.firstName,
        lastname: createUserDto.lastName,
      },
      {
        secret: process.env.SECREtKEYJWT,
        expiresIn: '1h',
      },
    );

    await this.emailService.sendMail({
      to: 'recipient@example.com',
      subject: 'Verify Email',
      text: 'This is for verify email',
      html: `
        <h1>Verify Email</h1>
        <p>Click <a href="http://localhost:3005/auth/verify-email/${createUserDto.email}/${token}">here</a> to verify your email</p>`,
    });

    return this.userRepository.create({
      ...createUserDto,
      timestamp: new Date(),
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      email: loginUserDto.email,
    });

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const isMatch = await this.bcryptservice.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isMatch) {
      return {
        message: 'Incorrect password',
      };
    }

    const payload = {
      id: user._id,
      username: user.firstName + ' ' + user.lastName,
      email: user.email,
    };

    const token = await this.serviceJwt.sign(payload, {
      secret: process.env.SECREtKEYJWT,
      expiresIn: '2day',
    });

    if (!user.emailVerified) {
      await this.emailService.sendMail({
        to: 'recipient@example.com',
        subject: 'Verify Email',
        text: 'This is for verify email',
        html: `
          <h1>Verify Email</h1>
          <p>Click <a href="http://localhost:3005/auth/verify-email/${user.email}/${token}">here</a> to verify your email</p>`,
      });
      return {
        message: 'User not verified check your email',
      };
    }

    return {
      message: 'User logged in successfully',
      access_token: token,
      info: payload,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async verifyEmail(email: string, token: string) {
    const user = await this.userRepository.findOne({ email: email });

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const payload = await this.serviceJwt.verify(token, {
      secret: process.env.SECREtKEYJWT,
    });

    if (!payload) {
      return {
        message: 'Token invalid',
      };
    }

    await this.userRepository.findOneAndUpdate(
      { email: email },
      { emailVerified: true },
    );

    return {
      message: 'Email verified',
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ email: email });

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const token = await this.serviceJwt.sign(
      {
        email: email,
      },
      {
        secret: process.env.SECREtKEYJWT,
        expiresIn: '1h',
      },
    );

    await this.emailService.sendMail({
      to: 'recipient@example.com',
      subject: 'Reset Password',
      text: 'This is for reset password',
      html: `
        <h1>Reset Password</h1>
        <p>Click <a href="http://localhost:3005/auth/reset-password/${email}/${token}">here</a> to reset your password</p>`,
    });

    return {
      message: 'Check your email',
    };
  }
}
