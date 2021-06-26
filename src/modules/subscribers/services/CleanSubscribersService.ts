import { injectable, inject } from 'tsyringe';
import ISubscriberRepository from '../repositories/ISubscriberRepository';

@injectable()
export default class CreateDistributionService {
  constructor(
    @inject('SubscriberRepository')
    private subscriberRepository: ISubscriberRepository,
  ) {}

  public async execute(): Promise<void> {
    await this.subscriberRepository.clean();
  }
}
