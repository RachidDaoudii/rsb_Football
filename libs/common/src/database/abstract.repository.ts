import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(data: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createDocument = new this.model({
      ...data,
      _id: new Types.ObjectId(),
    });

    this.logger.log(`Creating ${this.model.modelName}...`);
    return (await createDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        `Document not found in ${this.model.modelName} collection`,
      );
      return null;
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findByIdAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        `Document not found in ${this.model.modelName} collection`,
      );
      return null;
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.find(filterQuery).lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        `Document not found in ${this.model.modelName} collection`,
      );
      return null;
    }
    return document;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findByIdAndDelete(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        `Document not found in ${this.model.modelName} collection`,
      );
      return null;
    }
    return document;
  }
}
