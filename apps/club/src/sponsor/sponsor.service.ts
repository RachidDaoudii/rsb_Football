import { Injectable } from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { SponsorRepository } from './sponsor.repository';

@Injectable()
export class SponsorService {
  constructor(private readonly sponsorRepository: SponsorRepository) {}
  async create(createSponsorDto: CreateSponsorDto) {
    return await this.sponsorRepository.create(createSponsorDto);
  }

  async findAll() {
    return await this.sponsorRepository.findMany();
  }

  async findOne(id: string) {
    return await this.sponsorRepository.findOne(id);
  }

  async update(id: string, updateSponsorDto: UpdateSponsorDto) {
    return await this.sponsorRepository.findOneAndUpdate(id, updateSponsorDto);
  }

  async remove(id: string) {
    return await this.sponsorRepository.findOneAndDelete(id);
  }
}
