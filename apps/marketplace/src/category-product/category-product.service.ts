import { Injectable } from '@nestjs/common';
import { CreateCategoryProductDto } from './dto/create-category-product.dto';
import { UpdateCategoryProductDto } from './dto/update-category-product.dto';
import { CategoryProductRepository } from './category-product.repository';

@Injectable()
export class CategoryProductService {
  constructor(private readonly categoryProductRepository: CategoryProductRepository) {}
  async create(createCategoryProductDto: CreateCategoryProductDto) {
    return await this.categoryProductRepository.create(createCategoryProductDto);
  }

  async findAll() {
    return await this.categoryProductRepository.findAll();
  }

  async findOne(id: number) {
    return await this.categoryProductRepository.findOne(id);
  }

  async update(id: number, updateCategoryProductDto: UpdateCategoryProductDto) {
    return await this.categoryProductRepository.update(id, updateCategoryProductDto);
  }

  async remove(id: number) {
    return await this.categoryProductRepository.remove(id);
  }
}
