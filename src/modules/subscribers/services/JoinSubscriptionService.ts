import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
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
    const emailAlreadyUsed = await this.subscriberRepository.findByEmail(email);
    console.log(emailAlreadyUsed);
    if (emailAlreadyUsed) {
      throw new AppError('This e-mail already used');
    }
    const subscriber = await this.subscriberRepository.create({
      name,
      lastName,
      email,
    });

    return subscriber;
  }
}
