import { IsNotEmpty } from 'class-validator';
export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    image: string;

    file: Express.Multer.File;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    stock: number;
    @IsNotEmpty()
    description: string;
}
