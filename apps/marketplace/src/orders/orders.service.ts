import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.ordersRepository.createOrderProduct(createOrderDto);
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
    return await this.ordersRepository.Delivered(id);
  }

  async paid(id: number) {
    return await this.ordersRepository.Paid(id);
  }
}
