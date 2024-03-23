import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards,UploadedFile, UseInterceptors, ParseFilePipe, } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { RoleEnum, Roles } from '@app/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';

@Controller('api/v1/staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createStaffDto: CreateStaffDto
  // ,@UploadedFile(
  //   new ParseFilePipe({
  //     validators: [
  //       // new MaxFileSizeValidator({maxSize:2000}),
  //       // new FileTypeValidator({fileType:{}}),
  //     ]
  //   })
  // ) file:Express.Multer.File
  ) {
    // createStaffDto.file = file;
    return this.staffsService.create(createStaffDto);
  }

  @Get()
  findAll() {
    return this.staffsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffsService.findOne(+id);
  }

  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffsService.remove(+id);
  }
}
