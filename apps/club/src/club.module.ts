import { Module } from '@nestjs/common';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';

@Module({
  imports: [],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
