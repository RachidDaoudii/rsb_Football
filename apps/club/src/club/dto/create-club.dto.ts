import { Prop } from '@nestjs/mongoose';

export class CreateClubDto {
  @Prop()
  name: string;
  @Prop()
  logo: string;
  @Prop()
  phone: string;
  @Prop()
  address: string;
  @Prop()
  city: string;
  @Prop()
  userId: string;
}
