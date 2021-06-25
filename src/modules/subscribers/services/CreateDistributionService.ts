import { injectable, inject } from 'tsyringe';
import IDistributionRepository from '../repositories/IDistributionRepository';
import IDistributionContactRepository from '../repositories/IDistributionContactRepository';
import ISubscriberRepository from '../repositories/ISubscriberRepository';
import Distribution from '../infra/typeorm/entities/Distribution';

interface IRequest {
  description: string;
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

  public async execute({ description }: IRequest): Promise<Distribution> {
    const distribution = await this.distributionRepository.create(description);

    const subscribers = await this.subscriberRepository.findAllSubscribers(
      true,
    );

    await this.distributionContactRepository.create(
      distribution.id,
      subscribers,
    );

    return distribution;
  }
}
