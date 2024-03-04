import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    image: string;
    @IsNotEmpty()
    content: string;
    @IsNotEmpty()
    categoriesId: number;
    userId: number;
}
