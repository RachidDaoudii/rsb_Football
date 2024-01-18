import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(data: Omit<TDocument, '_id'>): Promise<TDocument> {
    try {
      const createDocument = new this.model({
        ...data,
        _id: new Types.ObjectId(),
      });
      this.logger.log(`Creating ${this.model.modelName}...`);
      if (!createDocument) {
        return {
          message: `Document not found in ${this.model.modelName} collection`,
        } as unknown as TDocument;
      }
      return (await createDocument.save()).toJSON() as unknown as TDocument;
    } catch (error) {
      this.logger.error(error.message);
      return error.message;
    }
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    try {
      const document = await this.model
        .findOne(filterQuery)
        .lean<TDocument>(true);

      if (!document) {
        // this.logger.warn(
        //   `Document not found in ${this.model.modelName} collection`,
        // );
        return {
          message: `Document not found in ${this.model.modelName} collection`,
        } as unknown as TDocument;
      }
      return document;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    try {
      const document = await this.model
        .findByIdAndUpdate(filterQuery, update, {
          new: true,
        })
        .lean<TDocument>(true);

      if (!document) {
        // this.logger.warn(
        //   `Document not found in ${this.model.modelName} collection`,
        // );
        return {
          message: `Document not found in ${this.model.modelName} collection`,
        } as unknown as TDocument;
      }
      return document;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    try {
      const document = await this.model.find(filterQuery).lean<TDocument>(true);

      if (!document) {
        // this.logger.warn(
        //   `Document not found in ${this.model.modelName} collection`,
        // );
        return {
          message: `Document not found in ${this.model.modelName} collection`,
        } as unknown as TDocument;
      }
      return document;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    try {
      const document = await this.model
        .findByIdAndDelete(filterQuery)
        .lean<TDocument>(true);

      if (!document) {
        // this.logger.warn(
        //   `Document not found in ${this.model.modelName} collection`,
        // );
        return {
          message: `Document not found in ${this.model.modelName} collection`,
        } as unknown as TDocument;
      }
      return document;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

}
