/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import Users from '@modules/users/infra/typeorm/entities/User';
import SubscribersGroup from './SubscribersGroup';

@Entity('groups')
class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  owner: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(
    () => SubscribersGroup,
    subscribersGroup => subscribersGroup.group_id,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  subscribers?: SubscribersGroup[];

  @OneToOne(() => Users)
  @JoinColumn({ name: 'owner' })
  user?: Users;
}

export default Group;
