import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}
  async create(createTeamDto: CreateTeamDto) {
    return await this.teamRepository.create(createTeamDto);
  }

  async findAll() {
    return await this.teamRepository.findMany();
  }

  async findOne(id: string) {
    return await this.teamRepository.findOne(id);
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    return await this.teamRepository.findOneAndUpdate(id, updateTeamDto);
  }

  async remove(id: string) {
    return await this.teamRepository.findOneAndDelete(id);
  }
}
