import { Injectable ,ConflictException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';
import { log } from 'console';
import { EmailService } from '@app/common';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository,
    private readonly emailService: EmailService
    ) {}
  async create(createOrderDto: CreateOrderDto) {
    const products = await this.ordersRepository.getProductsById(createOrderDto);

    if (products.length === 0) {
      throw new Error('Order must have at least one product.');
    }    

      const check = products.map((product) => {
        createOrderDto.productId.map((order)=>{
          if(product.stock < order.quantity){
            throw new ConflictException(`Product ${product.name} is out of stock.`);
          }
          this.ordersRepository.updateProduct(product.id, {quantity: product.stock - order.quantity});
        })
      }); 

 
    const saveOrder =  await this.ordersRepository.createOrderProduct(createOrderDto);

  return saveOrder;

}

  async findAll() {
    return  await this.ordersRepository.getAllOrders();
  }

  async findOne(id: number) {
    return await this.ordersRepository.getOrderById(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.ordersRepository.updateOrder(id, updateOrderDto);
  }

  async remove(id: number) {
    return await this.ordersRepository.removeOrder(id);
  }

  async delivered(id: number) {
    const order = await this.ordersRepository.getOrderById(id);
    await this.emailService.sendProductEmail(order);
    return await this.ordersRepository.Delivered(id);
  }

  async paid(id: number) {
    return await this.ordersRepository.Paid(id);
  }


}
