import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Locations } from './location.entity';


@Entity('houses')
export class Houses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column('uuid')
  ownerId: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'ownerId' })
  owner: Users;

  @Column({
    type: 'timestamp',
  })
  MFG: Date;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  locationId: string;

  @ManyToOne(() => Locations)
  @JoinColumn({ name: 'locationId' })
  location: Locations;
}
