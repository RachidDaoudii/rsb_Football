import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards ,UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator,Res,HttpStatus,} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { RoleEnum, Roles } from '@app/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
@Controller('api/v1/categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    ) {}

  @Post()
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createCategoryDto: CreateCategoryDto,
  @Res() res:Response
  // @UploadedFile(
  //   new ParseFilePipe({
  //     validators: [
  //       // new MaxFileSizeValidator({maxSize:2000}),
  //       // new FileTypeValidator({fileType:{}}),
  //     ]
    
  //   })
  // ) file:Express.Multer.File
  ) {
    // createCategoryDto.file = file;
    return res.status(HttpStatus.CREATED).json({
      message: 'Category created',
      data: await this.categoriesService.create(createCategoryDto)
    })
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res:Response) {
    return res.status(HttpStatus.OK).json({
      message: 'Category found',
      data: await  this.categoriesService.findOne(+id)
    })
  }

  @Patch(':id')
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,@Res() res:Response) {
    return res.status(HttpStatus.OK).json({
      message: 'Category updated',
      data: await this.categoriesService.update(+id, updateCategoryDto)
    })
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  async remove(@Param('id') id: string,@Res() res:Response) {
    return res.status(HttpStatus.OK).json({
      message: 'Category deleted',
      data: await this.categoriesService.remove(+id)
    })
  }
}
