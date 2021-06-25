import { injectable, inject } from 'tsyringe';
import ISubscriberRepository from '../repositories/ISubscriberRepository';
import Subscriber from '../infra/typeorm/entities/Subscriber';

interface IRequest {
  name: string;
  email: string;
  lastName?: string;
}

@injectable()
export default class JoinSubscriptionService {
  constructor(
    @inject('SubscriberRepository')
    private subscriberRepository: ISubscriberRepository,
  ) {}

  public async execute({
    name,
    email,
    lastName,
  }: IRequest): Promise<Subscriber> {
    const subscriber = await this.subscriberRepository.create({
      name,
      lastName,
      email,
    });

    return subscriber;
  }
}
