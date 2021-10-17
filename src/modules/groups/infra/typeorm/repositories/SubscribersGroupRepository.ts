import ICreateSubscriberGroupDTO from '@modules/groups/dtos/ICreateSubscriberGroupDTO';
import IOldestSubscriptionDTO from '@modules/groups/dtos/IOldestSubscriptionDTO';
import ISubscribersGroupRepository from '@modules/groups/repositories/ISubscribersGroupRepository';
import Subscriber from '@modules/subscribers/infra/typeorm/entities/Subscriber';
import { getRepository, In, Repository } from 'typeorm';
import Group from '../entities/Group';
import SubscribersGroup from '../entities/SubscribersGroup';

class SubscribersGroupRepository implements ISubscribersGroupRepository {
  private ormRepository: Repository<SubscribersGroup>;

  constructor() {
    this.ormRepository = getRepository(SubscribersGroup);
  }

  public async findOldestSubscription(
    subscribers: Subscriber[],
    group_ids: string[],
  ): Promise<IOldestSubscriptionDTO[]> {
    const serealizingGroupId = group_ids.map(e => `'${e}'`);
    const groupsIds = serealizingGroupId.join(',');
    const promises = subscribers.map(subscriber => {
      return this.ormRepository.query(
        `SELECT \
          sg.subscriber_id, \
          sg.group_id \
        from \
          subscribers_group sg \
        where \
          sg.group_id is not null and \
          sg.subscriber_id is not null and \
          sg.subscriber_id = '${subscriber.id}' and \
          sg.group_id in (${groupsIds}) \
        order by \
          sg.created_at \
        FETCH FIRST ROW ONLY`,
      );
    });

    const oldestSubscriptionsArrayPromise = await Promise.all(promises);

    const oldestSubscriptions = oldestSubscriptionsArrayPromise.map(sub => {
      const { subscriber_id, group_id } = sub[0];
      return { subscriber_id, group_id };
    });
    console.log(oldestSubscriptions);
    return oldestSubscriptions;
  }

  public async findGroupsBySubscriberId(
    id: string,
  ): Promise<Group[] | undefined> {
    const subscriptions = await this.ormRepository.find({
      where: { subscriber_id: id },
      relations: ['group'],
    });
    const groups = subscriptions.map(subscription => subscription.group);

    return groups;
  }

  public async findAllSubscribersByGroup(
    group_id: string,
    subscription_status: boolean,
  ): Promise<Subscriber[] | undefined> {
    const subscribersGroup = await this.ormRepository.find({
      where: { group_id, subscription_status },
    });

    const subscribers = subscribersGroup.reduce(
      (result: Subscriber[], currentValue: SubscribersGroup) => {
        return currentValue.subscriber
          ? [...result, currentValue.subscriber]
          : [...result];
      },
      [],
    );

    return subscribers;
  }

  public async findAllSubscribersByIdGroups(
    group_ids: string[],
    subscription_status: boolean,
  ): Promise<Subscriber[] | undefined> {
    const subscribersGroup = await this.ormRepository.find({
      where: {
        group_id: In(group_ids),
        subscription_status,
      },
    });

    const subscribers = subscribersGroup.reduce(
      (result: Subscriber[], currentValue: SubscribersGroup) => {
        return result.some(
          subscriber => subscriber.id === currentValue.subscriber_id,
        )
          ? [...result]
          : [...result, currentValue.subscriber];
      },
      [],
    );

    return subscribers;
  }

  public async create(
    data: ICreateSubscriberGroupDTO,
  ): Promise<SubscribersGroup> {
    const subscription = this.ormRepository.create({
      subscriber_id: data.subscriber_id,
      group_id: data.group_id,
      subscription_status: data.subscrition_status,
    });

    await this.ormRepository.save(subscription);

    return subscription;
  }

  public async import(data: ICreateSubscriberGroupDTO[]): Promise<void> {
    const subscribers = this.ormRepository.create(data);

    await this.ormRepository.save(subscribers);
  }

  public async save(subscriber: SubscribersGroup): Promise<SubscribersGroup> {
    await this.ormRepository.save(subscriber);

    return subscriber;
  }

  public async clean(): Promise<void> {
    await this.ormRepository.delete({ subscription_status: true });
  }
}

export default SubscribersGroupRepository;
