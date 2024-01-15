import { Prop } from '@nestjs/mongoose';

export class CreateCommentDto {
  @Prop()
  _id: string;
  @Prop()
  content: string;
  @Prop()
  userId: string;
  @Prop()
  blogId: string;

  @Prop({
    type: [Array],
    default: [
      {
        content: String,
        userId: String,
      },
    ],
  })
  replies: [
    {
      content: string;
      userId: string;
    },
  ];
}
