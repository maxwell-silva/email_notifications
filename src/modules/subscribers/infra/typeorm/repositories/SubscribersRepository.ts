import ICreateSubscriberDTO from '@modules/subscribers/dtos/ICreateSubscriberDTO';
import { getRepository, Repository } from 'typeorm';
import ISubscriberRepository from '../../../repositories/ISubscriberRepository';
import Subscriber from '../entities/Subscriber';

class SubscriberRepository implements ISubscriberRepository {
  private ormRepository: Repository<Subscriber>;

  constructor() {
    this.ormRepository = getRepository(Subscriber);
  }

  public async findById(id: string): Promise<Subscriber | undefined> {
    const subscriber = await this.ormRepository.findOne(id);

    return subscriber;
  }

  public async findByEmail(email: string): Promise<Subscriber | undefined> {
    const subscriber = await this.ormRepository.findOne(email);

    return subscriber;
  }

  public async findAllSubscribers(
    subscription_status: boolean,
  ): Promise<Subscriber[]> {
    const subscribers = await this.ormRepository.find({
      where: {
        subscription_status,
      },
    });

    return subscribers;
  }

  public async create({
    name,
    lastName,
    email,
  }: ICreateSubscriberDTO): Promise<Subscriber> {
    const subscriber = this.ormRepository.create({
      name,
      email,
      last_name: lastName,
      subscription_status: true,
    });

    await this.ormRepository.save(subscriber);

    return subscriber;
  }

  public async save(subscriber: Subscriber): Promise<Subscriber> {
    return this.ormRepository.save(subscriber);
  }
}

export default SubscriberRepository;
