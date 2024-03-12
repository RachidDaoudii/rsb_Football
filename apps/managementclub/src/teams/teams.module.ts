import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';

@Module({
  imports: [],
  controllers: [TeamsController],
  providers: [TeamsService,JwtService,ServiceJwt,UploadS3Service],
})
export class TeamsModule {}
