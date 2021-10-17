import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDistributionRepository from '../repositories/IDistributionRepository';
import IDistributionContactRepository from '../repositories/IDistributionContactRepository';
import ISubscriberRepository from '../repositories/ISubscriberRepository';
import Subscriber from '../infra/typeorm/entities/Subscriber';

interface IRequest {
  emails: string[];
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
  ) {}

  public async execute({ emails }: IRequest): Promise<void> {
    const subscribers = await this.subscriberRepository.findByEmails(emails);

    if (!subscribers.length) {
      throw new AppError('Ínvalid Request');
    }
    subscribers.forEach(e => {
      e.subscription_status = false;
    });
    const unSubscriptions: Subscriber[] = subscribers.map(subscriber => {
      subscriber.subscribersGroup.forEach(e => {
        e.subscription_status = false;
      });
      return subscriber;
    });

    await this.subscriberRepository.save(unSubscriptions);
  }
}
