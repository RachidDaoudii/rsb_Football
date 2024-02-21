import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Comment extends AbstractEntity<Comment> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  // relashionship
  @OneToMany(() => User, (user) => user)
  users: User[];
  // end relashionship
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
