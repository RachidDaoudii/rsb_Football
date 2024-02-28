import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Teams extends AbstractEntity<Teams> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  logo: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  city: string;
  @Column({ nullable: true })
  userId: number;
  //   relashionships
  @ManyToOne(() => Users, (user) => user)
  users: Users[];
  //   end relashionships
}
