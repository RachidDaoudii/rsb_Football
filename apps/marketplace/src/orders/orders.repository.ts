import { Injectable, Logger, ConflictException } from '@nestjs/common';

import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../entities';
import { Orders } from '../entities/orders.entity';
import { OrderProduct } from '../entities/orderProduct.entity';
import { log } from 'console';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersRepository {
  protected readonly logger = new Logger(OrdersRepository.name);
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

    async createOrderProduct(orderDto: CreateOrderDto){
        try {
            log(orderDto.productId.length)
                    
            if (orderDto.productId.length < 1) {
                throw new Error('Order must have at least one product.');
            }
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
        throw new ConflictException(error.message);
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

    async getOrderById(id: number){
        try {
            return await this.entityManager.findOne(Orders, {
                where: {id},
                relations: ['orderProducts', 'orderProducts.product']
            
            });
        } catch (error) {
            this.logger.error(error.message);
            throw new ConflictException('Error getting order by id');
        }
    }

    async updateOrder(id: number, orderDto: UpdateOrderDto){
        try {
            const order = await this.entityManager.update(Orders, id, orderDto);
            if (!order) {
                throw new Error(`Order with ID ${id} not found.`);
            }
            // const products = await this.entityManager.findByIds(Product, orderDto.productId.map((id: any) => id.id));
            // const orderProducts = products.map((product) => {
            //     const productDto: any = orderDto.productId.find((p: any) => p.id === product.id);
            //     if (!productDto) {
            //         throw new Error(`Product with ID ${product.id} not found in order DTO.`);
            //     }
            //     const orderProduct = new OrderProduct({
            //         order,
            //         product,
            //         quantity: productDto.quantity
            //     });
            //     orderProduct.product = product;
            //     return orderProduct;
            // });
            // await this.entityManager.save(order);
            // await this.entityManager.save(orderProducts);
            // return order;
        } catch (error) {
            this.logger.error(error.message);
            throw new ConflictException(error.message);
        }
    }


    async Delivered(id: number){
        try {
            const order = await this.entityManager.findOne(Orders, {where: {id}});
            
            if (!order) {
                throw new Error(`Order with ID ${id} not found.`);
            }
            order.isDelivered = true;
            
            await this.entityManager.save(order);
            return order;
        } catch (error) {
            this.logger.error(error.message);
            throw new ConflictException(error.message);
        }
    }

    async Paid(id: number){
        try {
            const order = await this.entityManager.findOne(Orders, {where: {id}});
            if (!order) {
                throw new Error(`Order with ID ${id} not found.`);
            }

            const isDelivered = order.isDelivered;
            if (!isDelivered) {
                throw new Error(`Order with ID ${id} not delivered.`);
            } 
            order.isPaid = true;
            await this.entityManager.save(order);
            return order;
        } catch (error) {
            this.logger.error(error.message);
            throw new ConflictException(error.message);
        }
    }

    async removeOrder(id: number){
        try {
            const order = await this.entityManager.findOne(Orders, {where: {id}});
            if (!order) {
                throw new Error(`Order with ID ${id} not found.`);
            }
            return await this.entityManager.remove(order);
        } catch (error) {
            this.logger.error(error.message);
            throw new ConflictException(error.message);
        }
    }



}