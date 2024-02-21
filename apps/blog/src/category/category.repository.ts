import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CategoryRepository {
  protected readonly logger = new Logger(CategoryRepository.name);

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
      this.logger.error(error);
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

  async remove(id: string) {
    try {
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
