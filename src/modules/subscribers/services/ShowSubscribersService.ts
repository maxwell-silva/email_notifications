import { injectable, inject } from 'tsyringe';
import ISubscriberRepository from '../repositories/ISubscriberRepository';
import Subscriber from '../infra/typeorm/entities/Subscriber';

interface IRequest {
  subscription_status: boolean;
}

@injectable()
export default class CreateDistributionService {
  constructor(
    @inject('SubscriberRepository')
    private subscriberRepository: ISubscriberRepository,
  ) {}

  public async execute({
    subscription_status,
  }: IRequest): Promise<Subscriber[]> {
    const subscribers = await this.subscriberRepository.findAllSubscribers(
      subscription_status,
    );

    return subscribers;
  }
}
