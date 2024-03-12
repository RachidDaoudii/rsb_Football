import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerRepository } from './players.repository';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';


@Injectable()
export class PlayersService {
  constructor(private readonly playerRepository: PlayerRepository,
    private readonly uploadS3Service: UploadS3Service
    ) {}
  async create(createPlayerDto: CreatePlayerDto) {
    const file = createPlayerDto.file;
    const upload = await this.uploadS3Service.uploadFile(file);
    createPlayerDto.image = upload
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
