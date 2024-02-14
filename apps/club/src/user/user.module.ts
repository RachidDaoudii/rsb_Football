import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModuleClub, PrismaServiceClub } from '@app/common';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModuleClub],
  controllers: [UserController],
  providers: [UserService, PrismaServiceClub, UserRepository],
})
export class UserModule {}
