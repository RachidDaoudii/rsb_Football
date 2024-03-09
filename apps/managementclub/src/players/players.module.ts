import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PlayerRepository } from './players.repository';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
@Module({
  controllers: [PlayersController],
  providers: [PlayersService,PlayerRepository,JwtService,ServiceJwt],
})
export class PlayersModule {}
