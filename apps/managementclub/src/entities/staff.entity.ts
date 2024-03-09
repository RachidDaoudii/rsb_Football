import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Player } from './player.entity';
import { Category } from './category.entity';
import { RoleStaffEnum } from '@app/common';


@Entity()
export class Staff extends AbstractEntity<Staff> {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    lastname: string;
    @Column()
    firstname: string;
    @Column()
    image: string;
    @Column()
    experience: string;
    @Column()
    nationality: string;
    @Column()
    Date_of_birth: string;
    @Column(
      {
        type: 'enum',
        enum: RoleStaffEnum,
        array: true,
        default: [null]
      }
    )
    role: RoleStaffEnum[];
    @Column()
    weight: number;
    @Column()
    size: number;
    @ManyToOne(() => Category, (category) => category.staff)
    @JoinColumn({ name: 'categoryId' })
    category: Category[];
  // end relashionship
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
