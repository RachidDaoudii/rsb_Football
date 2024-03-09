import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards ,UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { RoleEnum, Roles } from '@app/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    ) {}

  @Post()
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createCategoryDto: CreateCategoryDto,@UploadedFile(
    new ParseFilePipe({
      validators: [
        // new MaxFileSizeValidator({maxSize:2000}),
        // new FileTypeValidator({fileType:{}}),
      ]
    
    })
  ) file:Express.Multer.File) {
    createCategoryDto.file = file;
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
