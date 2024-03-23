import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    customerFirstName: string;
    @IsNotEmpty()
    customerLastName: string;
    @IsNotEmpty()
    customerEmail: string;
    @IsNotEmpty()
    customerPhone: string;
    @IsNotEmpty()
    customerAddressLin: string;
    @IsNotEmpty()
    city: string;
    @IsNotEmpty()
    state: string;
    @IsNotEmpty()
    postalCode: string;
    @IsNotEmpty()
    totalAmount: number;
    @IsNotEmpty()
    productId: [number];
    @IsNotEmpty()
    quantity: number;
    // @IsNotEmpty()
    // orderId: number;
}
