import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
