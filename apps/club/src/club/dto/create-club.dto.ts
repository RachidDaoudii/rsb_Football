import { IsNotEmpty } from 'class-validator';

export class CreateClubDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  logo: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  city: string;
  // @IsNotEmpty()
  // userId: string;
  @IsNotEmpty()
  description: String;
}
