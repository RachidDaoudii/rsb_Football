import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { RoleEnum } from '@app/common/enums';
import * as bcrypt from 'bcryptjs';
import { Category } from './category.entity';
import { Comment } from './comment.entity';
import { Post } from './post.entity';


@Entity()
export class User extends AbstractEntity<User> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({
    unique: true,
  })
  email: string;
  roles: RoleEnum[];
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  avatar: string;
  @Column({ nullable: true })
  address: string;
  @Column({ default: false })
  emailVerified: boolean;
  @Column({ default: false })
  isBlocked: boolean;
  @Column({ default: false })
  isDeleted: boolean;
  @Column({ nullable: true })
  emailVerificationToken: string;
  @Column({ nullable: true })
  passwordResetToken: string;
  @Column({ nullable: true })
  passwordResetTokenExpires: Date;
  @Column({ nullable: true })
  emailVerifiedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // relashionship

  @OneToMany(() => Post, (post) => post.users)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.users)
  comments: Comment[];
  // end relashionship
}
