import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = await this.blogRepository.create(createBlogDto);
    return blog;
  }

  async findAll() {
    return await this.blogRepository.findAll();
  }

  async findOne(id: string) {
    return await this.blogRepository.findOne(id);
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    return await this.blogRepository.update(id, updateBlogDto);
  }

  async remove(id: string) {
    return await this.blogRepository.remove(id);
  }

  async findManyByCategory(categoryId: string) {
    // return await this.blogRepository.findManyByCategory(categoryId);
  }
}
