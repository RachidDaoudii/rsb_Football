import { Injectable, Logger } from '@nestjs/common';
import { PrismaServiceClub } from '@app/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
@Injectable()
export class TeamRepository {
  constructor(private readonly prismaService: PrismaServiceClub) {}

  async create(team) {
    try {
      return await this.prismaService.team.create({
        data: {
          ...team,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async findMany() {
    try {
      return await this.prismaService.team.findMany();
    } catch (error) {
      return error.message;
    }
  }

  async findOne(_id: string) {
    try {
      return await this.prismaService.team.findUnique({
        where: {
          id: _id,
        },
        include: {
          user: true,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async findOneAndUpdate(_id: string, team: any) {
    try {
      return await this.prismaService.team.update({
        where: {
          id: _id,
        },
        data: {
          ...team,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async findOneAndDelete(_id: string) {
    try {
      return await this.prismaService.team.delete({
        where: {
          id: _id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async getManyrelation(include: object) {
    try {
      return await this.prismaService.team.findMany({
        include: {
          ...include,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async getOnerelation(include: object) {
    try {
      return await this.prismaService.team.findMany({
        include: {
          ...include,
        },
      });
    } catch (error) {
      return error.message;
    }
  }
}
