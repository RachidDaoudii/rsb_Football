import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToMany
} from 'typeorm';
import { CategoryProduct } from './categoryProduct.entity';
import { OrderProduct } from './orderProduct.entity';


@Entity()
export class Product extends AbstractEntity<Product> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column(
    {
      type: 'text',
      nullable: true
    }
  )
  image: string;
  @Column()
  price: number;
  @Column()
  stock: number;
  @Column()
  description: string;
  // relashionship
  @ManyToOne(() => CategoryProduct, (category) => category.product)
  @JoinColumn({ name: 'categoryId' })
  Category: CategoryProduct[];


  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];

  
  // end relashionship
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
