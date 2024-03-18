import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { OrderProduct } from './orderProduct.entity';


@Entity()
export class Orders extends AbstractEntity<Orders> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    customerFirstName: string;

    @Column({ type: 'varchar', length: 100 })
    customerLastName: string;

    @Column({ type: 'varchar', length: 100 })
    customerEmail: string;

    @Column({ type: 'varchar', length: 100 })
    customerPhone: string;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @Column({ type: 'text', nullable: true })
    customerAddressLin: string;

    @Column({ type: 'text', nullable: true })
    city: string;

    @Column({ type: 'text', nullable: true })
    state: string;

    @Column({ type: 'text', nullable: true })
    postalCode: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalAmount: number;

    @Column({ type: 'boolean', default: false })
    isDelivered: boolean;

    @Column({ type: 'boolean', default: false })
    isPaid: boolean;
    
    
   
    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[];


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    deletedAt: Date;
}
