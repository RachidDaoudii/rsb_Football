import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { Response } from 'express';
import { log } from 'console';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    try {
      const user = await this.authService.login(req.user);

      const {
        id,
        firstName,
        lastName,
        email,
        roles,
        accessToken,
        refreshToken,
      } = user;

      if (!user) {
        return res.status(401).json({
          message: 'Unauthorizeddsdsd',
        });
      }

      return res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .json({
          message: 'User logged in successfully',
          user: {
            id,
            firstName,
            lastName,
            email,
            roles,
          },
        });
    } catch (error) {
      return error;
    }
  }

  @Post('register')
  @MessagePattern('create-user')
  async registerUser(@Payload() @Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
