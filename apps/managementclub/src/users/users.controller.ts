import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  MessagePattern,
  Ctx,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { log } from 'console';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { RoleEnum, Roles } from '@app/common';
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @MessagePattern('create-user-club')
  create(@Payload() createUserDto: CreateUserDto, @Ctx() context: RmqContext) {
    log('--------------------')
    log('--------club--------')
    log('--------------------')
    log('paylod club createUserDto', createUserDto);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
