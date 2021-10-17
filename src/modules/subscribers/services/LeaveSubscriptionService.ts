import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDistributionRepository from '../repositories/IDistributionRepository';
import IDistributionContactRepository from '../repositories/IDistributionContactRepository';
import ISubscriberRepository from '../repositories/ISubscriberRepository';

interface IRequest {
  dist: string;
  id: string;
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

  public async execute({ dist, id }: IRequest): Promise<void> {
    const subscriber = await this.subscriberRepository.findById(id);

    if (!subscriber) {
      throw new AppError('Ínvalid Request');
    }
    subscriber.subscription_status = false;

    subscriber.subscribersGroup.forEach(e => {
      e.subscription_status = false;
    });

    await this.subscriberRepository.save(subscriber);

    if (dist) {
      const distributionContact = await this.distributionContactRepository.findBySubscriberAndDistribution(
        id,
        dist,
      );

      if (distributionContact) {
        distributionContact.unsubscription = true;

        await this.distributionContactRepository.save(distributionContact);
      }
    }
  }
}
