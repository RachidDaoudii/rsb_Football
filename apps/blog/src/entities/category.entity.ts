import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Blog } from './blog.entity';

@Entity()
export class Category extends AbstractEntity<Category> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  // relashionship
  @OneToMany(() => User, (user) => user.categories)
  users: User[];
  @ManyToMany(() => Blog, (blog) => blog.categories)
  @JoinTable()
  blogs: Blog[];
  // end relashionship
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
