import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './player.repository';
import { PrismaModule, PrismaService } from '@app/common';

@Module({
  imports: [PrismaModule],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerRepository, PrismaService],
})
export class PlayerModule {}
