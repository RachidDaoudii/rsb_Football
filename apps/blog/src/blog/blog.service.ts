import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  create(createBlogDto: CreateBlogDto) {
    return this.blogRepository.create({
      ...createBlogDto,
      timestamp: new Date(),
    });
  }

  findAll() {
    return this.blogRepository.find({});
  }

  findOne(_id: string) {
    return this.blogRepository.findOne({ _id });
  }

  update(_id: string, updateBlogDto: UpdateBlogDto) {
    return this.blogRepository.findOneAndUpdate(
      { _id },
      { $set: updateBlogDto },
    );
  }

  remove(_id: string) {
    return this.blogRepository.findOneAndDelete({ _id });
  }
}
