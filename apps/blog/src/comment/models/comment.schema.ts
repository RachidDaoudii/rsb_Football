import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class CommentDocument extends AbstractDocument {
  @Prop()
  content: string;
  @Prop()
  userId: string;
  @Prop()
  blogId: string;

  // @Prop({ type: [Object], default: [] })
  replies: [{
    content: string;
    userId: string;
  }];

  timestamp: Date;
}

export const CommentSchema = SchemaFactory.createForClass(CommentDocument);
