import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { PrismaModule, PrismaService } from '@app/common';
import { ClubRepository } from './club.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ClubController],
  providers: [ClubService, ClubRepository, PrismaService],
})
export class ClubModule {}
