import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { StaffRepository } from './staffs.repository';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';

@Module({
  imports: [],
  controllers: [StaffsController],
  providers: [StaffsService,StaffRepository,JwtService,ServiceJwt,UploadS3Service],
})
export class StaffsModule {}
