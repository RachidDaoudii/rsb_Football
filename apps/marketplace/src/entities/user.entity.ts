import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { RoleEnum } from '@app/common/enums';

@Entity()
export class Users extends AbstractEntity<Users> {
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
  @Column({
    type: 'enum',
    enum: RoleEnum,
    array: true,
    default: [RoleEnum.User],
  })
  roles: RoleEnum[];
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  avatar: string;
  @Column({ nullable: true })
  address: string;
  @Column({ default: false })
  emailVerified: boolean;
  //   relashionships
  // @OneToMany(() => Teams, (team) => team)
  // teams: Teams[];
  
  
  //   end relashionships
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
