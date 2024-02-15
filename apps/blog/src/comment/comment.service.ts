import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      return await this.commentRepository.create(createCommentDto);
    } catch (error) {
      return error;
    }
  }

  findAll() {
    try {
      return this.commentRepository.findAll();
    } catch (error) {
      return error;
    }
  }

  findOne(id: string) {
    try {
      return this.commentRepository.findOne(id);
    } catch (error) {
      return error;
    }
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      return this.commentRepository.update(id, updateCommentDto);
    } catch (error) {
      return error;
    }
  }

  remove(id: string) {
    try {
      return this.commentRepository.delete(id);
    } catch (error) {
      return error;
    }
  }
}
