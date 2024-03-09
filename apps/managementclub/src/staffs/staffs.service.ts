import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffRepository } from './staffs.repository';

@Injectable()
export class StaffsService {
  constructor(private readonly staffRepository: StaffRepository) {}
  async create(createStaffDto: CreateStaffDto) {
    return await this.staffRepository.create(createStaffDto);
  }

  async findAll() {
    return await this.staffRepository.findAll();
  }

  async findOne(id: number) {
    return await this.staffRepository.findOne(id);
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    return await this.staffRepository.update(id, updateStaffDto);
  }

  async remove(id: number) {
    return await this.staffRepository.remove(id);
  }
}
