import { IsNotEmpty } from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  experience: string;
  @IsNotEmpty()
  nationality: string;
  @IsNotEmpty()
  Date_of_birth: string;
  @IsNotEmpty()
  position: string;
  @IsNotEmpty()
  weight: number;
  @IsNotEmpty()
  size: number;
  @IsNotEmpty()
  role: string;
  @IsNotEmpty()
  file: Express.Multer.File;
}
