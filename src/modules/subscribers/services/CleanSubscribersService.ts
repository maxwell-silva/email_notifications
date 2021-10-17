import ISubscribersGroupRepository from '@modules/groups/repositories/ISubscribersGroupRepository';
import { injectable, inject } from 'tsyringe';
import ISubscriberRepository from '../repositories/ISubscriberRepository';

@injectable()
export default class CreateDistributionService {
  constructor(
    @inject('SubscriberRepository')
    private subscriberRepository: ISubscriberRepository,

    @inject('SubscribersGroupRepository')
    private subscribersGroupRepository: ISubscribersGroupRepository,
  ) {}

  public async execute(): Promise<void> {
    await this.subscriberRepository.clean();
  }
}
