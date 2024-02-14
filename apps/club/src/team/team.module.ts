import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { PrismaModuleClub, PrismaServiceClub } from '@app/common';
import { TeamRepository } from './team.repository';

@Module({
  imports: [PrismaModuleClub],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository, PrismaServiceClub],
})
export class TeamModule {}
