import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ISubscribersGroupRepository from '@modules/groups/repositories/ISubscribersGroupRepository';
import Subscriber from '../infra/typeorm/entities/Subscriber';

interface IRequest {
  groupId: string;
}

@injectable()
export default class CreateDistributionService {
  constructor(
    @inject('SubscribersGroupRepository')
    private subscribersGroupRepository: ISubscribersGroupRepository,
  ) {}

  public async execute({ groupId }: IRequest): Promise<Subscriber[]> {
    const subscribers = await this.subscribersGroupRepository.findAllSubscribersByGroup(
      groupId,
      true,
    );

    if (!subscribers) {
      throw new AppError('invalid request, no date response for this request');
    }

    return subscribers;
  }
}
