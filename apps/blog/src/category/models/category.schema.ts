import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class CategoryDocument extends AbstractDocument {
  @Prop()
  name: string;

  timestamp: Date;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDocument);
