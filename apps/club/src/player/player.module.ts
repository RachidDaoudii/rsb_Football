import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './player.repository';
import { PrismaModuleClub, PrismaServiceClub } from '@app/common';

@Module({
  imports: [PrismaModuleClub],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerRepository, PrismaServiceClub],
})
export class PlayerModule {}
