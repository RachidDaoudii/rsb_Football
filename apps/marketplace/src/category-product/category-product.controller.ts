import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CreateCategoryProductDto } from './dto/create-category-product.dto';
import { UpdateCategoryProductDto } from './dto/update-category-product.dto';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { RoleEnum, Roles } from '@app/common';
@Controller('api/v1/category-product')
export class CategoryProductController {
  constructor(private readonly categoryProductService: CategoryProductService) {}

  @Post()
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  create(@Body() createCategoryProductDto: CreateCategoryProductDto) {
    return this.categoryProductService.create(createCategoryProductDto);
  }

  @Get()
  findAll() {
    return this.categoryProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryProductService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updateCategoryProductDto: UpdateCategoryProductDto) {
    return this.categoryProductService.update(+id, updateCategoryProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.categoryProductService.remove(+id);
  }
}
