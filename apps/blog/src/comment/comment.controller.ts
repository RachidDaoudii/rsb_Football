import { Controller, Get, Post, Body, Patch, Param, Delete ,Res ,HttpStatus,UseGuards,Req} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Response } from 'express';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { RoleEnum, Roles } from '@app/common';
import { log } from 'console';

@Controller('api/v1/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req, @Body() createCommentDto: CreateCommentDto ,@Res() res: Response){
    try {
      const userId = req.user.id; 
      createCommentDto.userId = userId;
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Req() req,@Param('id') _id: string, @Body() updateCommentDto: UpdateCommentDto) {
    const userId = req.user.id; 
    const comment = await this.findOne(_id);
    const { users } = comment;
    const { id }:any = users;

    if (id !== userId) {
      return 'You are not authorized to perform this action';
    }
    return this.commentService.update(+_id, updateCommentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Req() req,@Param('id') _id: string) {
    const userId = req.user.id; 
    const comment = await this.findOne(_id);
    const { users } = comment;
    const { id }:any = users;

    if (id !== userId) {
      return 'You are not authorized to perform this action';
    }
    return this.commentService.remove(+_id);
  }
}
