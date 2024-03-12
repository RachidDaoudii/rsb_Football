import { IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
    @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()

  firstname: string;
  image: string;
  experience: string;
  nationality: string;
  Date_of_birth: string;
  position: string;
  weight: number;
  size: number;
  matches_played: number;
  goals_scored: number;
  file: Express.Multer.File;
}
