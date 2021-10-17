import Subscriber from '@modules/subscribers/infra/typeorm/entities/Subscriber';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Group from './Group';

@Entity('subscribers_group')
class SubscribersGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subscriber_id: string;

  @Column()
  group_id: string;

  @Column()
  subscription_status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Group, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => Subscriber, subscriber => subscriber.subscribersGroup, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: Subscriber;
}

export default SubscribersGroup;
