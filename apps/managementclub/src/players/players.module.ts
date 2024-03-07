import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PlayerRepository } from './players.repository';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService,PlayerRepository],
})
export class PlayersModule {}
