import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDistributionRepository from '../repositories/IDistributionRepository';
import IDistributionContactRepository from '../repositories/IDistributionContactRepository';
import ISubscriberRepository from '../repositories/ISubscriberRepository';

interface IRequest {
  subscriber_id: string;
  distribution_id?: string;
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

  public async execute({
    subscriber_id,
    distribution_id,
  }: IRequest): Promise<void> {
    const subscriber = await this.subscriberRepository.findById(subscriber_id);

    if (!subscriber) {
      throw new AppError('Ínvalid Request');
    }
    subscriber.subscription_status = false;

    await this.subscriberRepository.save(subscriber);

    if (distribution_id) {
      const distributionContact = await this.distributionContactRepository.findBySubscriberAndDistribution(
        subscriber_id,
        distribution_id,
      );

      if (!distributionContact) {
        throw new AppError('Ínvalid Request');
      }

      distributionContact.unsubscription = true;

      await this.distributionContactRepository.save(distributionContact);
    }
  }
}
