import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany ,ManyToOne} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';


@Entity()
export class Comment extends AbstractEntity<Comment> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  // relashionship
  @ManyToOne(() => User, (user) => user.comments)
  users: User[];
  @ManyToOne(() => Post, (post) => post.comments)
  posts: Post[];
  // end relashionship
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
