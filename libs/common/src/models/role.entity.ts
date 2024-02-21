import { AbstractEntity } from '@app/common/config/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends AbstractEntity<Role> {
  @Column()
  Name: string;
}
