import { IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
    @IsNotEmpty()
  readonly lastname: string;
  @IsNotEmpty()

  readonly firstname: string;
  readonly image: string;
  readonly experience: string;
  readonly nationality: string;
  readonly Date_of_birth: string;
  readonly position: string;
  readonly weight: number;
  readonly size: number;
  readonly matches_played: number;
  readonly goals_scored: number;
  readonly file: Express.Multer.File;
}
