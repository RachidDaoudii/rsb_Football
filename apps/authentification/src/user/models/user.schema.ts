import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  urlClub: string;
  @Prop()
  city: string;
  @Prop()
  country: string;
  @Prop({ unique: true })
  phoneNumber: string;
  @Prop()
  role: string;
  @Prop()
  status: string;
  @Prop()
  avatar: string;
  @Prop()
  emailVerified: boolean;
  timestamp: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
