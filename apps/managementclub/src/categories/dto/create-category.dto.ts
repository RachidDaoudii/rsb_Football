import { IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;
    // @IsNotEmpty()
    image: string;
    file: Express.Multer.File;
    
}
