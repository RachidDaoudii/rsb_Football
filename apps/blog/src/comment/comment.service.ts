import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {

  constructor(private readonly commentRepository: CommentRepository) {}
  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.create(createCommentDto);
  }

  findAll() {
    return `This action returns all comment`;
  }

  async findOne(id: number) {
    return await this.commentRepository.findOne(id);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    return await this.commentRepository.remove(id);
  }
}
