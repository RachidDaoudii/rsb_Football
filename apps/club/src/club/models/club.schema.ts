import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ClubDocument extends AbstractDocument {
  @Prop({ unique: true })
  name: string;
  @Prop()
  logo: string;
  @Prop({
    unique: true,
  })
  phone: string;
  @Prop()
  address: string;
  @Prop()
  city: string;
  @Prop()
  userId: string;
  timestamp: Date;
}

export const ClubSchema = SchemaFactory.createForClass(ClubDocument);
