import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullname: String;
  @IsNotEmpty()
  email: String;
  @IsNotEmpty()
  role: String;
}
