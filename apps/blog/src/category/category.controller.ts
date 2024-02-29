import { Controller, Get, Post, Body, Patch, Param, Delete ,Res,HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';
import { log } from 'console';


@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto,@Res() res:Response) {
    const category = await this.categoryService.create(createCategoryDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Category created',
      data: category
    });
  }

  @Get()
  async findAll(@Res() res:Response) {
    const category = await this.categoryService.findAll();
    return res.status(HttpStatus.CREATED).json({
      message: 'Category found',
      data: category
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res:Response) {
    const category =  await this.categoryService.findOne(+id);
    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Category not found',
      });
    }

    return res.status(HttpStatus.CREATED).json({
      message: 'Category found',
      data: category
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,@Res() res:Response) {
    const category = await this.categoryService.update(+id, updateCategoryDto);
    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Category not found',
      });
    }
    return res.status(HttpStatus.CREATED).json({
      message: 'Category updated',
      data: category
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Res() res:Response) {
    const category =await  this.categoryService.remove(+id);
    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Category not found',
      });
    }
    return res.status(HttpStatus.CREATED).json({
      message: 'Category deleted',
      data: category
    });
  }
}
