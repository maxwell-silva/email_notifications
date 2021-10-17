/* eslint-disable camelcase */
import SubscribersGroup from '@modules/groups/infra/typeorm/entities/SubscribersGroup';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import DistributionContacts from './DistributionContact';

@Entity('subscribers')
class Subscriber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  subscription_status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => DistributionContacts,
    distributionContact => distributionContact.subscriber,
    {
      cascade: true,
    },
  )
  distributions: DistributionContacts[];

  @OneToMany(
    () => SubscribersGroup,
    subscribersGroup => subscribersGroup.subscriber,
    {
      cascade: true,
    },
  )
  subscribersGroup: SubscribersGroup[];
}

export default Subscriber;
