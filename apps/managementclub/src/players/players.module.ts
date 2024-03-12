import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PlayerRepository } from './players.repository';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService,PlayerRepository,JwtService,ServiceJwt,UploadS3Service],
})
export class PlayersModule {}
