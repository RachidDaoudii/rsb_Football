import { Injectable, Logger } from '@nestjs/common';
import { PrismaServiceClub } from '@app/common';
import { CreateClubDto } from './dto/create-club.dto';

@Injectable()
export class ClubRepository {
  constructor(private readonly prismaService: PrismaServiceClub) {}

  async create(club: any) {
    try {
      return await this.prismaService.club.create({
        data: {
          ...club,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async findMany() {
    try {
      return await this.prismaService.club.findMany({
        include: {
          user: true,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async findOne(_id) {
    try {
      return await this.prismaService.club.findUnique({
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

  async findOneAndUpdate(_id, club: any) {
    try {
      return await this.prismaService.club.update({
        where: {
          id: _id,
        },
        data: {
          ...club,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async findOneAndDelete(_id) {
    try {
      return await this.prismaService.club.delete({
        where: {
          id: _id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }
}
