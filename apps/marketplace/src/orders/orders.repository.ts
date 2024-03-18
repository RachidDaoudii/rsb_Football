import { Injectable, Logger, ConflictException } from '@nestjs/common';

import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../entities';
import { Orders } from '../entities/orders.entity';
import { OrderProduct } from '../entities/orderProduct.entity';
import { log } from 'console';

@Injectable()
export class OrdersRepository {
  protected readonly logger = new Logger(OrdersRepository.name);
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

    async createOrderProduct(orderDto: CreateOrderDto){
        try {
            const order = new Orders(orderDto);
            const products = await this.entityManager.findByIds(Product, orderDto.productId.map((id: any) => id.id));

            const orderProducts = products.map((product) => {
                const productDto: any = orderDto.productId.find((p: any) => p.id === product.id);
                if (!productDto) {
                    throw new Error(`Product with ID ${product.id} not found in order DTO.`);
                }

                const orderProduct = new OrderProduct({
                    order,
                    product,
                    quantity: productDto.quantity
                });

                orderProduct.product = product;
                return orderProduct;
            });
            await this.entityManager.save(order);
            await this.entityManager.save(orderProducts);
            return order;
    
            
        } catch (error) {
        this.logger.error(error.message);
        throw new ConflictException('Error creating order product');
        }
    }


    async getAllOrders(){
        try {
            return await this.entityManager.find(Orders,{relations: ['orderProducts', 'orderProducts.product']});
        } catch (error) {
            this.logger.error(error.message);
            throw new ConflictException('Error getting all orders');
        }
    }

}