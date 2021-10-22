import ICreateSubscriberGroupDTO from '@modules/groups/dtos/ICreateSubscriberGroupDTO';
import IOldestSubscriptionDTO from '@modules/groups/dtos/IOldestSubscriptionDTO';
import ISubscribersGroupRepository from '@modules/groups/repositories/ISubscribersGroupRepository';
import Subscriber from '@modules/subscribers/infra/typeorm/entities/Subscriber';
import AppError from '@shared/errors/AppError';
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
    const removedInvalidValues: Array<string> = group_ids.filter(
      e => e,
    ) as Array<string>;
    const serealizingGroupId = removedInvalidValues.map(e => `'${e}'`);
    if (!serealizingGroupId.length) {
      throw new AppError('Invalid request,');
    }
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

    const promiseResponse = await Promise.all(promises);
    if (!promiseResponse.length) {
      throw new AppError('invalid request, no results');
    }
    const flattedData = promiseResponse.reduce(
      (acc, val) => acc.concat(val),
      [],
    );

    const oldestSubscriptions: IOldestSubscriptionDTO[] = flattedData.map(
      (sub: { subscriber_id: string; group_id: string }) => {
        const { subscriber_id, group_id } = sub;
        return { subscriber_id, group_id };
      },
    );

    const responseData = oldestSubscriptions.filter(
      e => e.group_id && e.subscriber_id,
    );

    return responseData;
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
      subscription_status: data.subscription_status,
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
