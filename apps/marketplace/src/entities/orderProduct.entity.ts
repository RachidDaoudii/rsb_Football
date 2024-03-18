import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Orders } from './orders.entity';

@Entity()
export class OrderProduct extends AbstractEntity<OrderProduct> {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Orders, (order) => order.orderProducts)
  @JoinColumn({ name: 'orderId' })
  order: Orders;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number | null;

}
