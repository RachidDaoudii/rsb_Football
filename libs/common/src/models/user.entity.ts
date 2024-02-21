import { AbstractEntity } from '@app/common/config/database';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;
  // @Column()
  // city: string;
  // @Column()
  // country: string;
  // @Column()
  // phone: string;
  // @ManyToMany(() => Role, { cascade: true })
  // roles?: Role[];
  // @Column()
  // avatar: string;
  // @Column({ default: false })
  // emailVerified: boolean;
}
