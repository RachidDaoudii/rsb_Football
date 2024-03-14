import { IsNotEmpty } from 'class-validator';
export class CreateCategoryProductDto {
    @IsNotEmpty()
    name: string;
}
