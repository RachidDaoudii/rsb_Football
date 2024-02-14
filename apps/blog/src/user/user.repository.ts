import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './models/user.schema';

@Injectable()
export class CommentRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(CommentRepository.name);

  constructor(@InjectModel(UserDocument.name) clubModel: Model<UserDocument>) {
    super(clubModel);
  }
}
