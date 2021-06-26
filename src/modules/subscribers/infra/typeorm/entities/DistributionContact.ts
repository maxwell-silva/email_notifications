/* eslint-disable camelcase */
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

  @ManyToOne(() => Subscriber)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber?: Subscriber;

  @ManyToOne(() => Distribution)
  @JoinColumn({ name: 'distribution_id' })
  distribution?: Distribution;
}

export default DistributionContacts;
