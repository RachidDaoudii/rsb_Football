import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { PrismaModuleClub, PrismaServiceClub } from '@app/common/database/club';
import { ClubRepository } from './club.repository';

@Module({
  imports: [PrismaModuleClub],
  controllers: [ClubController],
  providers: [ClubService, ClubRepository, PrismaServiceClub],
})
export class ClubModule {}
