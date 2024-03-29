import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  id: Number;
  @IsNotEmpty()
  name: String;
  @IsNotEmpty()
  email: String;
  @IsNotEmpty()
  role: String;
}
