import { Module } from '@nestjs/common';
import { ClubModule } from '../club/club.module';

@Module({
  imports: [ClubModule],
  controllers: [],
  providers: [],
})
export class appModule {}
