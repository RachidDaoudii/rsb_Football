import { IsNotEmpty } from 'class-validator';

export class CreateStaffDto {
    @IsNotEmpty()
  readonly lastname: string;
  @IsNotEmpty()

  readonly firstname: string;
  readonly image: string;
  readonly experience: string;
  readonly nationality: string;
  readonly Date_of_birth: string;
  readonly role: string;
  readonly weight: number;
  readonly size: number;
}
