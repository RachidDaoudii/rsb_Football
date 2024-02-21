import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CommentRepository {
  protected readonly logger = new Logger(CommentRepository.name);

  constructor() {}

  async create(data: any) {
    try {
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async findAll() {
    try {
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  async findOne(id: string) {
    try {
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async update(id: string, data: any) {
    try {
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async delete(id: string) {
    try {
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
