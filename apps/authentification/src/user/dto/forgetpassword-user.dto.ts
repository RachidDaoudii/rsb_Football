import { IsNotEmpty } from 'class-validator';

export class ForgetPasswordUserDto {
  @IsNotEmpty()
  email: string;
}
