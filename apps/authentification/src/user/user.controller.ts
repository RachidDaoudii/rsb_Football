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
import { ForgetPasswordUserDto } from './dto/forgetpassword-user.dto';
import { log } from 'console';

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

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Email or password incorrect',
        });
      }

      if (user.messageError) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: user.messageError,
        });
      }

      return res
        .cookie('jwt', user.access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
        })
        .json({
          message: 'User logged in successfully',
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
  async forgotPassword(
    @Body() forgetpasswordUserDto: ForgetPasswordUserDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.forgotPassword(
        forgetpasswordUserDto.email,
      );

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: ['User not found'],
        });
      }
      return res.status(HttpStatus.OK).json({
        user,
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
