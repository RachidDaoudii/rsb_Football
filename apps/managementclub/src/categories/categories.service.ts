import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return await this.categoryRepository.remove(id);
  }
}
