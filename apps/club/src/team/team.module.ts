import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { PrismaModule, PrismaService } from '@app/common';
import { TeamRepository } from './team.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository, PrismaService],
})
export class TeamModule {}
