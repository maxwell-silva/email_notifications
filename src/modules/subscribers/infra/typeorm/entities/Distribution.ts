/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
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

  @Column()
  view_id: string;

  @Column()
  subject: string;

  @Column()
  unsubscribe_clicks: number;

  @Column()
  engagement_clicks: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => DistributionContacts,
    distributionContact => distributionContact.distribution,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  distributions?: DistributionContacts[];
}

export default Distribution;
