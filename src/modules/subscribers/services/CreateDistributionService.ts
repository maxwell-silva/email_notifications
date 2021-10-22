import { injectable, inject } from 'tsyringe';
import ISubscribersGroupRepository from '@modules/groups/repositories/ISubscribersGroupRepository';
import AppError from '@shared/errors/AppError';
import IDistributionRepository from '../repositories/IDistributionRepository';
import IDistributionContactRepository from '../repositories/IDistributionContactRepository';
import ISubscriberRepository from '../repositories/ISubscriberRepository';
import Distribution from '../infra/typeorm/entities/Distribution';

interface IRequest {
  description: string;
  groups: string[];
  excludSubscribersByGroup?: string[];
  subject: string;
  viewId: string;
}

interface IResponse {
  amountOfEmails: number;
  distribution: Distribution;
}

@injectable()
export default class CreateDistributionService {
  constructor(
    @inject('DistributionRepository')
    private distributionRepository: IDistributionRepository,

    @inject('DistributionContactRepository')
    private distributionContactRepository: IDistributionContactRepository,

    @inject('SubscriberRepository')
    private subscriberRepository: ISubscriberRepository,

    @inject('SubscribersGroupRepository')
    private subscribersGroupRepository: ISubscribersGroupRepository,
  ) {}

  public async execute({
    description,
    groups,
    excludSubscribersByGroup,
    subject,
    viewId: view_id,
  }: IRequest): Promise<IResponse> {
    if (!groups.length) {
      throw new AppError('Invalid request, groups is important');
    }

    const distribution = await this.distributionRepository.create({
      description,
      subject,
      view_id,
    });

    const subscribersToAdd = await this.subscribersGroupRepository.findAllSubscribersByIdGroups(
      groups,
      true,
    );

    if (!subscribersToAdd?.length) {
      throw new AppError('The parameters result 0 subscribers to notificate');
    }

    const exceptedSubscribers = excludSubscribersByGroup?.length
      ? await this.subscribersGroupRepository.findAllSubscribersByIdGroups(
          excludSubscribersByGroup,
          true,
        )
      : undefined;

    const exceptedSubscribersIds = exceptedSubscribers
      ? exceptedSubscribers.map(subscriber => subscriber.id)
      : undefined;

    const subscribers = exceptedSubscribersIds
      ? subscribersToAdd.filter(
          subscriber => !exceptedSubscribersIds.includes(subscriber.id),
        )
      : subscribersToAdd;

    if (!subscribers?.length) {
      throw new AppError('The parameters result 0 subscribers to notificate');
    }

    const notifications = await this.subscribersGroupRepository.findOldestSubscription(
      subscribers,
      groups,
    );

    await this.distributionContactRepository.create(
      distribution.id,
      notifications,
    );

    const amountOfEmails = notifications.length;

    return { amountOfEmails, distribution };
  }
}
