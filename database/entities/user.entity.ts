import { UserRole } from '../../src/common/enum/user-role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Houses } from './house.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({
    type: 'int',
  })
  age: number;

  @Exclude()
  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  houses: Houses[];
}
