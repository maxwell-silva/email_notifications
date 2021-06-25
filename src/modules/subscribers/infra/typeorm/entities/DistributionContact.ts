/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DistributionContacts;
