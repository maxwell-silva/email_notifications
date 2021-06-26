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
    const subscriber = await this.ormRepository.findOne(email);

    return subscriber;
  }

  public async findByEmails(emails: string[]): Promise<string[]> {
    const alreadyExists = await this.ormRepository.find({
      select: ['email'],
      where: {
        email: In(emails),
      },
    });

    const alreadyExistsEmails = alreadyExists.map(e => {
      return e.email;
    });

    return alreadyExistsEmails;
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
    const subscribers = await this.ormRepository.find({
      where: {
        subscription_status: true,
      },
    });

    const promises = subscribers.map(async subscriber => {
      await this.ormRepository.delete(subscriber);
    });

    await Promise.all(promises);
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

  public async import(data: ICreateSubscriberDTO[]): Promise<void> {
    const subscribers = this.ormRepository.create(data);

    await this.ormRepository.save(subscribers);
  }
}

export default SubscriberRepository;
