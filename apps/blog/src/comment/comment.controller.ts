import { Controller, Get, Post, Body, Patch, Param, Delete ,Res ,HttpStatus} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Response } from 'express';


@Controller('api/v1/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto ,@Res() res: Response){
    try {
      const data = await this.commentService.create(createCommentDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Comment created successfully',
        data
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'An error occurred',
        error: error.message
      });
    }
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
