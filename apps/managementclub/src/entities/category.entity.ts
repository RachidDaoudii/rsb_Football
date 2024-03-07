import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm';
import { Player } from './player.entity';
import { Staff } from './staff.entity';

@Entity()
export class Category extends AbstractEntity<Category> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column(
    {
      type: 'text',
      nullable: true
    }
  )
  image: string;
  // relashionship
  @OneToMany(() => Player, (player) => player.category)
  player: Player[];
  @OneToMany(() => Staff, (staff) => staff.category)
  staff: Staff[];
  // end relashionship
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
