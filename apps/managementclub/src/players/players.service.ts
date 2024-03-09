import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerRepository } from './players.repository';

@Injectable()
export class PlayersService {
  constructor(private readonly playerRepository: PlayerRepository) {}
  async create(createPlayerDto: CreatePlayerDto) {
    return await this.playerRepository.create(createPlayerDto);
  }

  async findAll() {
    return await this.playerRepository.findAll();
  }

  async findOne(id: number) {
    return await this.playerRepository.findOne(id);
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return await this.playerRepository.update(id, updatePlayerDto);
  }

  async remove(id: number) {
    return await this.playerRepository.remove(id);
  }
}
