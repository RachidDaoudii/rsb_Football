import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    try {
      const user = await this.userService.create(createUserDto);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'User not found',
        });
      }

      return res.status(HttpStatus.CREATED).json({
        message: 'User created',
      });
    } catch (error) {
      return error;
    }
  }
}
