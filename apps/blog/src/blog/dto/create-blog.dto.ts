import { IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  tags: string[];
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  clubId: string;
}
