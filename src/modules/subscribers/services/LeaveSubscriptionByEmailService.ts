import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDistributionRepository from '../repositories/IDistributionRepository';
import IDistributionContactRepository from '../repositories/IDistributionContactRepository';
import ISubscriberRepository from '../repositories/ISubscriberRepository';

interface IRequest {
  email: string;
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

  public async execute({ email }: IRequest): Promise<void> {
    const subscriber = await this.subscriberRepository.findByEmail(email);

    if (!subscriber) {
      throw new AppError('Ínvalid Request');
    }
    subscriber.subscription_status = false;
    subscriber.subscribersGroup.forEach(e => {
      e.subscription_status = false;
    });

    await this.subscriberRepository.save(subscriber);
  }
}
