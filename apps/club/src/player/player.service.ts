import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}
  async create(createPlayerDto: CreatePlayerDto) {
    return await this.playerRepository.create(createPlayerDto);
  }

  async findAll() {
    return await this.playerRepository.getAll();
  }

  async findOne(id: string) {
    return await this.playerRepository.getOne(id);
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return await this.playerRepository.update(id, updatePlayerDto);
  }

  async remove(id: string) {
    return await this.playerRepository.delete(id);
  }

  async get(include: object) {
    return await this.playerRepository.get(include);
  }
}
