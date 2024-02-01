import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      return error;
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.login(loginUserDto);

      return res
        .cookie('jwt', user.access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
        })
        .json({
          message: user.message,
          data: user.info,
        });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: error.message,
      });
    }
  }

  @Post('verify-email/:email/:token')
  async verifyEmail(
    @Param('email') email: string,
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.verifyEmail(email, token);

      return res.status(HttpStatus.OK).json({
        message: user,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: error.message,
      });
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: any, @Res() res: Response) {
    try {
      const user = await this.userService.forgotPassword(body.email);

      return res.status(HttpStatus.OK).json({
        message: user,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: error.message,
      });
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
