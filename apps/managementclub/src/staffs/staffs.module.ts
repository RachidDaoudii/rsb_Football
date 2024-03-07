import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { StaffRepository } from './staffs.repository';

@Module({
  imports: [],
  controllers: [StaffsController],
  providers: [StaffsService,StaffRepository],
})
export class StaffsModule {}
