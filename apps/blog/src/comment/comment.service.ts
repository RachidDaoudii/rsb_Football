import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  create(createCommentDto: CreateCommentDto) {
    // if (createCommentDto._id) {
    //   const comment = this.findOne(createCommentDto._id);
    //   if (comment) {
    //     // createCommentDto.replies.push(createCommentDto._id);
    //   }
    // }
    return this.commentRepository.create({
      ...createCommentDto,
      timestamp: new Date(),
      replies: createCommentDto.replies
    });
  }

  findAll() {
    return this.commentRepository.find({});
  }

  findOne(_id: string) {
    return this.commentRepository.findOne({ _id });
  }

  update(_id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.findOneAndUpdate(
      { _id },
      { $set: updateCommentDto },
    );
  }

  remove(_id: string) {
    return this.commentRepository.findOneAndDelete({ _id });
  }
}
