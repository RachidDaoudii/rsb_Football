// import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { CommentDocument } from './models/comment.schema';

@Injectable()
export class CommentRepository {
  protected readonly logger = new Logger(CommentRepository.name);

  constructor() // @InjectModel(CommentDocument.name) clubModel: Model<CommentDocument>,
  {
    // super(clubModel);
  }
}
