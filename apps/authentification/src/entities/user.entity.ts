import { AbstractEntity } from '@app/common/config/database/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { RoleEnum } from '@app/common/enums';
import * as bcrypt from 'bcryptjs';

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
  @Column()
  password: string;
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

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
