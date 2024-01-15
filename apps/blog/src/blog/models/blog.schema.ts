import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class BlogDocument extends AbstractDocument {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  content: string;
  @Prop()
  image: string;
  @Prop()
  category: string;
  @Prop()
  tags: string[];
  @Prop()
  userId: string;
  @Prop()
  clubId: string;

  timestamp: Date;
}

export const BlogSchema = SchemaFactory.createForClass(BlogDocument);
