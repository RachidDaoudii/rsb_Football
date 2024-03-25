import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { RoleEnum, Roles } from '@app/common';


@Controller('api/v1/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  @Post()
  create(@Req() req,@Body() createPostDto: CreatePostDto) {
    const userId = req.user.id; 
    // if(!userId) throw new Error('User not found');
    createPostDto.userId = userId;
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard,RoleGuard)
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
