import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { DatabaseModule } from '../config';
import { User } from '../entities';

@Module({
  imports: [DatabaseModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
