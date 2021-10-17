/* eslint-disable camelcase */
import Group from '@modules/groups/infra/typeorm/entities/Group';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Distribution from './Distribution';
import Subscriber from './Subscriber';

@Entity('distribution_contacts')
class DistributionContacts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  distribution_id: string;

  @Column()
  subscriber_id: string;

  @Column()
  group_id: string;

  @Column()
  delivery_status: boolean;

  @Column()
  unsubscription: boolean;

  @Column()
  delivery_failure: boolean;

  @Column()
  error: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Subscriber, {
    eager: true,
  })
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: Subscriber;

  @ManyToOne(() => Group, {
    eager: true,
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => Distribution, {
    eager: true,
  })
  @JoinColumn({ name: 'distribution_id' })
  distribution: Distribution;
}

export default DistributionContacts;
