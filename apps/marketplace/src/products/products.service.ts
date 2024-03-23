import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './products.repository';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository,private readonly uploadS3Service: UploadS3Service) {}
  async create(createProductDto: CreateProductDto) {
    // const file = createProductDto.file;
    // const upload = await this.uploadS3Service.uploadFile(file);
    // createProductDto.image = upload
    return await this.productRepository.create(createProductDto);
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async findOne(id: number) {
    return await this.productRepository.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return await this.productRepository.remove(id);
  }
}
