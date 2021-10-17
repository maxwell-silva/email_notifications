import ICreateSubscriberDTO from '@modules/subscribers/dtos/ICreateSubscriberDTO';
import { getRepository, In, Repository } from 'typeorm';
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
    const subscriber = await this.ormRepository.findOne({
      where: { email },
      relations: ['subscribersGroup'],
    });

    return subscriber;
  }

  public async findByEmails(emails: string[]): Promise<Subscriber[]> {
    const alreadyExists = await this.ormRepository.find({
      where: {
        email: In(emails),
      },
      relations: ['subscribersGroup'],
    });

    return alreadyExists;
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

  public async clean(): Promise<void> {
    await this.ormRepository.delete({ subscription_status: true });
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

  public async save(
    subscriber: Subscriber | Subscriber[],
  ): Promise<Subscriber | Subscriber[]> {
    if (Array.isArray(subscriber)) {
      await this.ormRepository.save(subscriber);
    } else {
      await this.ormRepository.save(subscriber);
    }
    return subscriber;
  }

  public async import(data: ICreateSubscriberDTO[]): Promise<Subscriber[]> {
    const subscribers = this.ormRepository.create(data);

    await this.ormRepository.save(subscribers);

    return subscribers;
  }
}

export default SubscriberRepository;
