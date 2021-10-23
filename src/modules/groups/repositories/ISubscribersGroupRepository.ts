import Subscriber from '@modules/subscribers/infra/typeorm/entities/Subscriber';
import ICreateSubscriberGroupDTO from '../dtos/ICreateSubscriberGroupDTO';
import IOdestSubscriptionDTO from '../dtos/IOldestSubscriptionDTO';
import Group from '../infra/typeorm/entities/Group';
import SubscribersGroup from '../infra/typeorm/entities/SubscribersGroup';

export default interface ISubscribersRepositorory {
  findByIdAndGroupId(
    id: string,
    group_id: string,
  ): Promise<SubscribersGroup | undefined>;
  findGroupsBySubscriberId(id: string): Promise<Group[] | undefined>;
  findAllSubscribersByGroup(
    group_id: string,
    subscription_status: boolean,
  ): Promise<Subscriber[] | undefined>;
  findAllSubscribersByIdGroups(
    group_ids: string[],
    subscription_status: boolean,
  ): Promise<Subscriber[] | undefined>;
  findOldestSubscription(
    subscribers: Subscriber[],
    group_ids: string[],
  ): Promise<IOdestSubscriptionDTO[]>;
  create(data: ICreateSubscriberGroupDTO): Promise<SubscribersGroup>;
  import(data: ICreateSubscriberGroupDTO[], group_id: string): Promise<void>;
  save(subscriber: SubscribersGroup): Promise<SubscribersGroup>;
  clean(): Promise<void>;
}
