import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
@Module({
  imports: [],
  controllers: [TeamsController],
  providers: [TeamsService,JwtService,ServiceJwt],
})
export class TeamsModule {}
