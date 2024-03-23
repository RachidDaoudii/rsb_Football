import { Controller, Get, Post, Body, Patch, Param, Delete,UploadedFile, UseInterceptors, ParseFilePipe, UseGuards} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { RoleEnum, Roles } from '@app/common';
@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  @Post()
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createProductDto: CreateProductDto,
  // @UploadedFile(
  //   new ParseFilePipe({
  //     validators: [
  //       // new MaxFileSizeValidator({maxSize:2000}),
  //       // new FileTypeValidator({fileType:{}}),
  //     ]
  //   })
  // ) file:Express.Multer.File
  ) {
    // createProductDto.file=file;
    return await  this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id);
  }
}
