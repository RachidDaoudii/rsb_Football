import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { ClubRepository } from './club.repository';

@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}
  async create(createClubDto: CreateClubDto) {
    try {
      const club = await this.clubRepository.create({
        ...createClubDto,
      });

      return club;
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    const club = await this.clubRepository.findMany();
    if (club.length === 0) {
      return false;
    }
  }

  async findOne(_id: Number) {
    return await this.clubRepository.findOne(parseInt(_id.toString()));
  }

  async update(_id: Number, updateClubDto: UpdateClubDto) {
    return await this.clubRepository.findOneAndUpdate(
      parseInt(_id.toString()),
      updateClubDto,
    );
  }

  async remove(_id: Number) {
    return await this.clubRepository.findOneAndDelete(parseInt(_id.toString()));
  }
}
