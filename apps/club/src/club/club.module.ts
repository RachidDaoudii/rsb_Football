import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { PrismaModuleClub, PrismaServiceClub } from '@app/common';
import { ClubRepository } from './club.repository';

@Module({
  imports: [PrismaModuleClub],
  controllers: [ClubController],
  providers: [ClubService, ClubRepository, PrismaServiceClub],
})
export class ClubModule {}
