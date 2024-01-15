import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  _id: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  blogId: string;

  @IsNotEmpty()
  replies: [
    {
      content: string;
      userId: string;
    },
  ];
}
