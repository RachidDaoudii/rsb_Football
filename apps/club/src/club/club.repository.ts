import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ClubDocument } from './models/club.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClubRepository extends AbstractRepository<ClubDocument> {
  protected readonly logger = new Logger(ClubRepository.name);

  constructor(@InjectModel(ClubDocument.name) clubModel: Model<ClubDocument>) {
    super(clubModel);
  }
}
