import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {

  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  postId: string;

  // @IsNotEmpty()
  // replies: [
  //   {
  //     content: string;
  //     userId: string;
  //   },
  // ];
}
