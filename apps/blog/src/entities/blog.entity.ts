import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity()
export class Blog extends AbstractEntity<Blog> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  // relashionship
  @OneToMany(() => User, (user) => user)
  users: User[];
  @ManyToMany(() => Category, (category) => category.blogs)
  // @JoinTable()
  categories: Category[];
  // end relashionship
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
