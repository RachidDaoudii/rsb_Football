import { IsNotEmpty } from 'class-validator';

export class User {
  id: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  urlClub: string;
  city: string;
  country: string;
  phone: string;
  role: string;
  status: string;
  avatar: string;
  emailVerified: boolean;
}
