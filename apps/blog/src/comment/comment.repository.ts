
import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { log } from 'console';
import { Post ,Category ,User, Comment} from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { NotFoundException } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from '../post/post.repository';

@Injectable()
export class CommentRepository{
    protected readonly logger = new Logger(CommentRepository.name);
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly postRepository: PostRepository,
      ) {}
    
    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        try {
            const users = await this.postRepository.findOneUser(createCommentDto.userId);
            const posts = await this.entityManager.findOne(Post, { where: { id: createCommentDto.postId } });
            if (!users || !posts) {
                throw new NotFoundException(`Entity with ID not found`);
            }
            const comment = await this.entityManager.create(Comment, { ...createCommentDto, users, posts });
            return this.entityManager.save(Comment, comment);
        } catch (error) {
            return error.message;
        }
    }
    
    findAll(): Promise<Comment[]> {
        try {
            return this.entityManager.find(Comment);
        } catch (error) {
            return error.message;
        }
    }
    
    async findOne(id) {
        return await this.entityManager.findOne(Comment,{
            where: { id: id },
        });
    }
    
    async update(id, updateCommentDto) {
        try {
            const comment =  await this.entityManager.update(Comment, id, updateCommentDto);
            if (!comment) {
                throw new NotFoundException(`Entity with ID not found`);
            }

            return comment.affected === 1 ? await this.findOne(id) : 'Unable to update comment';
        } catch (error) {
            return error.message;
        }
    }
    
    async remove(id) {
        try {
            const comment =  await this.findOne(id);
            if (!comment) {
                throw new NotFoundException(`Entity with ID not found`);
            }
           return await this.entityManager.delete(Comment, id);
                 
        } catch (error) {
            return error.message;

        }
    }

    
}