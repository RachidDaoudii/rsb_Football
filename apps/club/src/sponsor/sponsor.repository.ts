import { Injectable, Logger } from '@nestjs/common';
import { PrismaServiceClub } from '@app/common';

@Injectable()
export class SponsorRepository {
  constructor(private readonly prismaService: PrismaServiceClub) {}

  async create(sponsor: any) {
    try {
      return await this.prismaService.sponsor.create({
        data: {
          ...sponsor,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async findMany() {
    try {
      return await this.prismaService.sponsor.findMany({
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
      return await this.prismaService.sponsor.findUnique({
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

  async findOneAndUpdate(_id, sponsor: any) {
    try {
      return await this.prismaService.sponsor.update({
        where: {
          id: _id,
        },
        data: {
          ...sponsor,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async findOneAndDelete(_id) {
    try {
      return await this.prismaService.sponsor.delete({
        where: {
          id: _id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }
}
