import { Module } from '@nestjs/common';
import { ClubModule } from '../club/club.module';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';
import { PlayerModule } from '../player/player.module';
import { TeamModule } from '../team/team.module';
import { SponsorModule } from '../sponsor/sponsor.module';

@Module({
  imports: [
    ClubModule,
    UserModule,
    CategoryModule,
    PlayerModule,
    TeamModule,
    SponsorModule,
  ],
  controllers: [],
  providers: [],
})
export class appModule {}
