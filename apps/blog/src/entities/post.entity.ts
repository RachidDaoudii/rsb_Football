import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post extends AbstractEntity<Post> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  image: string;
  @Column()
  content: string;
  // relashionship
  @ManyToOne(() => User, (user) => user.posts, { cascade: true })
 
  @JoinColumn({ name: 'userId' })
  users: User;
  
  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'categoryId' })
  categories: Category[];

  @OneToMany(() => Comment, (comment) => comment.posts)
  comments: Comment[];
  // end relashionship
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date;
}
