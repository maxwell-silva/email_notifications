import { getRepository, Repository } from 'typeorm';
import ICreateSubscriberDTO from '@modules/subscribers/dtos/ICreateSubscriberDTO';
import Subscriber from '../entities/Subscriber';
import ISubscriberRepository from '../../../repositories/ISubscriberRepository';

class SubscribersRepository implements ISubscriberRepository {
  private ormRepository: Repository<Subscriber>;

  constructor() {
    this.ormRepository = getRepository(Subscriber);
  }

  public async findById(id: string): Promise<Subscriber | undefined> {
    const subscriber = await this.ormRepository.findOne(id);

    return subscriber;
  }

  public async findByEmail(email: string): Promise<Subscriber | undefined> {
    const subscriber = await this.ormRepository.findOne({
      where: { email },
    });

    return subscriber;
  }

  public async findAllSubscribers(
    subscription_status: boolean,
  ): Promise<Subscriber[]> {
    const subscribers = await this.ormRepository.find({
      where: { subscription_status },
    });

    return subscribers;
  }

  public async create(userData: ICreateSubscriberDTO): Promise<Subscriber> {
    const subscriber = this.ormRepository.create(userData);

    await this.ormRepository.save(subscriber);

    return subscriber;
  }

  public async save(subscriber: Subscriber): Promise<Subscriber> {
    return this.ormRepository.save(subscriber);
  }
}

export default SubscribersRepository;
