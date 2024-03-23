import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './categories.repository';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository,
    private readonly uploadS3Service: UploadS3Service
    ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    // const file = createCategoryDto.file;
    // const upload = await this.uploadS3Service.uploadFile(file);
    // createCategoryDto.image = upload
    return await this.categoryRepository.create({
      name: createCategoryDto.name,
      image: createCategoryDto.image
    });
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
