import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffRepository } from './staffs.repository';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';

@Injectable()
export class StaffsService {
  constructor(private readonly staffRepository: StaffRepository,
    private readonly uploadS3Service: UploadS3Service) {}
  async create(createStaffDto: CreateStaffDto) {
    const file = createStaffDto.file;
    const upload = await this.uploadS3Service.uploadFile(file);
    createStaffDto.image = upload
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
