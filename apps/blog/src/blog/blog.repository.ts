import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { BlogDocument } from './models/blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BlogRepository extends AbstractRepository<BlogDocument> {
  protected readonly logger = new Logger(BlogRepository.name);

  constructor(@InjectModel(BlogDocument.name) clubModel: Model<BlogDocument>) {
    super(clubModel);
  }
}
