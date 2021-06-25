/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import DistributionContacts from './DistributionContact';

@Entity('distributions')
class Distribution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => DistributionContacts,
    distributionContact => distributionContact.distribution_id,
    {
      cascade: true,
    },
  )
  distributions?: DistributionContacts[];
}

export default Distribution;
