import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { log } from 'console';
import { Post ,Category ,User ,Comment} from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class PostRepository {
  protected readonly logger = new Logger(PostRepository.name);
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager, 
  ) {}

  async create(data: any): Promise<Post> {
    try {
      const categories = await this.findOneCategory(data.categoriesId)
      const users = await this.findOneUser(data.usersId)
        if (!categories || ! users) {
          throw new NotFoundException(`Entity with ID not found`);
        }
      const post = this.entityManager.create(Post, { ...data ,users,categories});
        return await this.entityManager.save(Post, post);
    } catch (error) {
      return error.message;
    }
  }

    async findOne(id: number): Promise<Post> {
        try {
        const post =  await this.entityManager.findOne(Post, {
            where: { id: id },
            select: ['id', 'title','image' ,'content', 'createdAt'],
            relations: ['users', 'categories','comments' , 'comments.users'],
        });

        

        if (!post){
          throw new NotFoundException(`Entity with ID not found`);
        }

        return post;

        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async findAll(): Promise<any> {
      try {

        const posts = await this.entityManager.find(Post, {
          select: ['id', 'title','image' ,'content', 'createdAt','categories'],
          relations: ['users', 'categories'],
        });
        return posts
      } catch (error) {
        throw new ConflictException(error.message);
      }
    }

    async update(id: number, data: any): Promise<any> {
        try {
        const post = await this.findOne(id);
        if (!post){
            return null;
        }


        const categories = await this.findOneCategory(data.categoriesId)
        if (!categories) {
          throw new NotFoundException(`Entity with ID not found`);
        }

        const postUpdate = this.entityManager.create(Post, { ...post, ...data,categories });
        return await this.entityManager.save(Post, postUpdate);

        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async remove(id: number): Promise<Post> {
        try {
        const post = await this.findOne(id);
        if (!post){
            return null;
        }

        const comment = await this.entityManager.findOne(Comment, {where:{
          posts: id 
        }})
        if (comment){
          await this.entityManager.delete(Comment, comment.id);
        }
        await this.entityManager.delete(Post, id);
        return post;
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }


    async findOneCategory(id: number): Promise<Category> {
      try {
      const category =  await this.entityManager.findOne(Category, {
          where: { id: id },
      });
      

      if (!category){
          return null;
      }

      return category;

      } catch (error) {
      throw new ConflictException(error.message);
      }
  }

  async findOneUser(id: number): Promise<User> {
    try {
    const user =  await this.entityManager.findOne(User, {
        where: { id: id },
    });
    

    if (!user){
        return null;
    }

    return user;

    } catch (error) {
    throw new ConflictException(error.message);
    }
}

}
