import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUserEntity } from '../interfaces/user.interface';
import { ROLES } from '../../constants/roles';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUserEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES, nullable: false })
  role: ROLES;
}
