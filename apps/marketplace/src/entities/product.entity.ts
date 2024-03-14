import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { CategoryProduct } from './categoryProduct.entity';


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
  // end relashionship
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
