import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,UploadedFile, UseInterceptors, ParseFilePipe, } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { RoleEnum, Roles } from '@app/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createPlayerDto: CreatePlayerDto,@UploadedFile(
    new ParseFilePipe({
      validators: [
        // new MaxFileSizeValidator({maxSize:2000}),
        // new FileTypeValidator({fileType:{}}),
      ]
    
    })
  ) file:Express.Multer.File) {
    createPlayerDto.file = file;
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
