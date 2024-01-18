import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  async create(@Res() res: Response, @Body() createClubDto: CreateClubDto) {
    const club = await this.clubService.create(createClubDto);
    if (club) {
      return res.status(HttpStatus.CREATED).json({
        message: 'Club created successfully',
        data: club,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      message: 'Club not created',
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const club = await this.clubService.findAll();

    if (club) {
      return res.status(HttpStatus.FOUND).json({
        message: 'Club found',
        data: club,
      });
    }

    return res.status(HttpStatus.NOT_FOUND).json({
      message: 'Club not found',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: Number) {
    return this.clubService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: Number, @Body() updateClubDto: UpdateClubDto) {
    return this.clubService.update(id, updateClubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Number) {
    return this.clubService.remove(id);
  }
}
