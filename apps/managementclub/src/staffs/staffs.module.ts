import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { StaffRepository } from './staffs.repository';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
@Module({
  imports: [],
  controllers: [StaffsController],
  providers: [StaffsService,StaffRepository,JwtService,ServiceJwt],
})
export class StaffsModule {}
