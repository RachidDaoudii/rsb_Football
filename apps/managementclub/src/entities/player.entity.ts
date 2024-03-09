import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Category } from './category.entity';
import { PositionEnum } from '@app/common';


@Entity()
export class Player extends AbstractEntity<Player> {
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
      enum: PositionEnum,
      array: true,
      default: [null]
    }
  )
  position: PositionEnum[];
  @Column()
  number: number;
  @Column()
  weight: number;
  @Column()
  size: number;
  @Column()
  matches_played: number;
  @Column()
  goals_scored: number;
  // relashionship
  @ManyToOne(() => Category, (category) => category.player)
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
