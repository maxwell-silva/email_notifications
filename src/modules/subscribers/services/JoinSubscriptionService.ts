import { injectable, inject } from 'tsyringe';
import ISubscribersGroupRepository from '@modules/groups/repositories/ISubscribersGroupRepository';
import ISubscriberRepository from '../repositories/ISubscriberRepository';
import Subscriber from '../infra/typeorm/entities/Subscriber';

interface IRequest {
  name: string;
  email: string;
  lastName?: string;
  groupId: string;
}

@injectable()
export default class JoinSubscriptionService {
  constructor(
    @inject('SubscriberRepository')
    private subscriberRepository: ISubscriberRepository,

    @inject('SubscribersGroupRepository')
    private subscribersGroupRepository: ISubscribersGroupRepository,
  ) {}

  public async execute({
    name,
    email,
    lastName,
    groupId,
  }: IRequest): Promise<Subscriber> {
    const emailAlreadyUsed = await this.subscriberRepository.findByEmail(email);
    if (emailAlreadyUsed) {
      emailAlreadyUsed.subscription_status = true;
      await this.subscriberRepository.save(emailAlreadyUsed);
      const subscription = await this.subscribersGroupRepository.findByIdAndGroupId(
        emailAlreadyUsed.id,
        groupId,
      );
      if (!subscription) {
        await this.subscribersGroupRepository.create({
          group_id: groupId,
          subscriber_id: emailAlreadyUsed.id,
          subscription_status: true,
        });
        return emailAlreadyUsed;
      }
      subscription.subscription_status = true;
      await this.subscribersGroupRepository.save(subscription);

      return emailAlreadyUsed;
    }
    const subscriber = await this.subscriberRepository.create({
      name,
      lastName,
      email,
    });

    this.subscribersGroupRepository.create({
      group_id: groupId,
      subscriber_id: subscriber.id,
      subscription_status: true,
    });

    return subscriber;
  }
}
