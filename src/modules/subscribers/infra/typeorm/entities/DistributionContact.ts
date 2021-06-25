/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
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

  @ManyToOne(() => Subscriber, subscriber => subscriber.distributions)
  subscriber?: Subscriber;

  @ManyToOne(() => Distribution, distribution => distribution.distributions)
  distribution?: Distribution;
}

export default DistributionContacts;
