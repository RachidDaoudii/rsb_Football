import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { ClubRepository } from './club.repository';

@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}
  async create(createClubDto: CreateClubDto) {
    try {
      return await this.clubRepository.create({
        ...createClubDto,
        timestamp: new Date(),
      });
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return await this.clubRepository.find({});
  }

  async findOne(_id: string) {
    return await this.clubRepository.findOne({ _id });
  }

  async update(_id: string, updateClubDto: UpdateClubDto) {
    return await this.clubRepository.findOneAndUpdate(
      { _id },
      { $set: updateClubDto },
    );
  }

  async remove(_id: string) {
    return await this.clubRepository.findOneAndDelete({ _id });
  }
}
