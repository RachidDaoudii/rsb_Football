import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BlogRepository {
  protected readonly logger = new Logger(BlogRepository.name);
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

  async findAllPostWithCategory() {
    try {
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
