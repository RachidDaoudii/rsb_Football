import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from '../entities';
import { PlayerRepository } from './players.repository';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';
import { EntityManager } from 'typeorm';
import { ConfigService } from '@nestjs/config';

describe('PlayersController', () => {
  let controller: PlayersController;
  let service: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [PlayersService,PlayerRepository,JwtService,ServiceJwt,UploadS3Service,EntityManager,ConfigService],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    service = module.get<PlayersService>(PlayersService);
  });

  describe('create', () => {
    it('should create a player', async () => {
      const createPlayerDto: CreatePlayerDto = {
          lastname: '',
          firstname: '',
          image: '',
          experience: '',
          nationality: '',
          Date_of_birth: '',
          position: '',
          weight: 0,
          size: 0,
          matches_played: 0,
          goals_scored: 0
      };

    const player: Player = {
        id: 1,
        number: 10,
        category: [],
        createdAt: new Date(),
        lastname: '',
        firstname: '',
        image: '',
        experience: '',
        nationality: '',
        Date_of_birth: '',
        position: [],
        weight: 0,
        size: 0,
        matches_played: 0,
        goals_scored: 0,
        updatedAt: undefined,
        deletedAt: undefined
    };

    jest.spyOn(service, 'create').mockResolvedValueOnce([player]);

    const result = await controller.create(createPlayerDto);

      expect(service.create).toHaveBeenCalledWith(createPlayerDto);
      expect(result).toEqual([player]);
    });
  });

describe('findAll', () => {
    it('should return an array of players', async () => {
        const players: Player[] = [{
            id: 1,
            number: 10,
            category: [],
            createdAt: new Date(),
            lastname: '',
            firstname: '',
            image: '',
            experience: '',
            nationality: '',
            Date_of_birth: '',
            position: [],
            weight: 0,
            size: 0,
            matches_played: 0,
            goals_scored: 0,
            updatedAt: undefined,
            deletedAt: undefined},
             {id: 1,
                number: 10,
                category: [],
                createdAt: new Date(),
                lastname: '',
                firstname: '',
                image: '',
                experience: '',
                nationality: '',
                Date_of_birth: '',
                position: [],
                weight: 0,
                size: 0,
                matches_played: 0,
                goals_scored: 0,
                updatedAt: undefined,
                deletedAt: undefined}]; // Provide sample player objects

        jest.spyOn(service, 'findAll').mockResolvedValueOnce(players);

        const result = await controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
        expect(result).toEqual(players);
    });
});

describe('findOne', () => {
    it('should return a player', async () => {
        const playerId = '1'; // Provide a sample player ID
        const player: Player = {
            id: 1,
        number: 10,
        category: [],
        createdAt: new Date(),
        lastname: '',
        firstname: '',
        image: '',
        experience: '',
        nationality: '',
        Date_of_birth: '',
        position: [],
        weight: 0,
        size: 0,
        matches_played: 0,
        goals_scored: 0,
        updatedAt: undefined,
        deletedAt: undefined
        }; // Provide a sample player object

        jest.spyOn(service, 'findOne').mockResolvedValueOnce(player);

        const result = await controller.findOne(playerId);

        expect(service.findOne).toHaveBeenCalledWith(+playerId);
        expect(result).toEqual(player);
    });
});

describe('update', () => {
    it('should update a player', async () => {
        const playerId = '1'; // Provide a sample player ID
        const updatePlayerDto: UpdatePlayerDto = {
            // Provide the necessary properties for updatePlayerDto
        };

        jest.spyOn(service, 'update').mockResolvedValueOnce(Promise.resolve({} as Player));

        const result = await controller.update(playerId, updatePlayerDto);

        expect(service.update).toHaveBeenCalledWith(+playerId, updatePlayerDto);
        expect(result).toEqual({});
    });
});

describe('remove', () => {
    it('should remove a player', async () => {
        const playerId = '1'; // Provide a sample player ID

        jest.spyOn(service, 'remove').mockResolvedValueOnce({} as Player | Promise<Player>);

        const result = await controller.remove(playerId);

        expect(service.remove).toHaveBeenCalledWith(+playerId);
        expect(result).toEqual({});
    });
});
});