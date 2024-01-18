import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class TagDocument extends AbstractDocument {
  @Prop()
  name: string;

  timestamp: Date;
}

export const TgaSchema = SchemaFactory.createForClass(TagDocument);
