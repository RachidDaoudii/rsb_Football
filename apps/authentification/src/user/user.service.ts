import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { bcryptService } from '@app/common/helpers/bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { ServiceJwt } from '../helpers/jwt/jwt.service';
import { EmailService } from '../helpers/mail/mail.service';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptservice: bcryptService,
    private readonly serviceJwt: ServiceJwt,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.bcryptservice.hash(
      createUserDto.password,
    );

    const user = await this.userRepository.create(createUserDto);

    if (!user) {
      return {
        message: 'User already exists',
      };
    }

    const token = await this.serviceJwt.sign({
      email: createUserDto.email,
      fullname: createUserDto.fullname,
    });

    await this.emailService.sendEmail(token, createUserDto.email);

    return {
      messageError:
        'User created successfully check your email to verify your email',
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findUnique({
      email: loginUserDto.email,
    });

    const isMatch = await this.bcryptservice.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isMatch || !user) {
      return false;
    }

    const payload = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    };

    const token = await this.serviceJwt.sign(payload);

    if (!user.verified) {
      await this.emailService.sendEmail(token, user.email);

      return {
        messageError: 'User not verified check your email',
      };
    }

    return {
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
    // const user = await this.userRepository.findOne({ email: email });

    // if (!user) {
    //   return {
    //     message: 'User not found',
    //   };
    // }

    // const payload = await this.serviceJwt.verify(token, {
    //   secret: process.env.SECREtKEYJWT,
    // });

    // if (!payload) {
    //   return {
    //     message: 'Token invalid',
    //   };
    // }

    // await this.userRepository.findOneAndUpdate(
    //   { email: email },
    //   { emailVerified: true },
    // );

    return {
      message: 'Email verified',
    };
  }

  async forgotPassword(email: string) {
    // const user = await this.userRepository.findOne({ email: email });

    // if (!user) {
    //   return false;
    // }

    // const token = await this.serviceJwt.sign(
    //   {
    //     email: email,
    //   },
    //   {
    //     secret: process.env.SECREtKEYJWT,
    //     expiresIn: '1h',
    //   },
    // );

    // await this.emailService.sendMail({
    //   to: 'recipient@example.com',
    //   subject: 'Reset Password',
    //   text: 'This is for reset password',
    //   html: `
    //     <h1>Reset Password</h1>
    //     <p>Click <a href="http://localhost:3005/auth/reset-password/${email}/${token}">here</a> to reset your password</p>`,
    // });

    return {
      message: 'Check your email',
    };
  }
}
