import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class CategoryProduct extends AbstractEntity<CategoryProduct> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  // relashionship
  @OneToMany(() => Product, (product) => product.Category)
  product: Product[];
  // end relashionship
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
