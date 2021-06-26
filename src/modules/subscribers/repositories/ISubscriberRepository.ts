import Subscriber from '@modules/subscribers/infra/typeorm/entities/Subscriber';
import ICreateRepositoryDTO from '@modules/subscribers/dtos/ICreateSubscriberDTO';

export default interface ISubscribersRepositorory {
  findById(id: string): Promise<Subscriber | undefined>;
  findByEmail(email: string): Promise<Subscriber | undefined>;
  findByEmails(emails: string[]): Promise<string[]>;
  findAllSubscribers(subscription_status: boolean): Promise<Subscriber[]>;
  create(data: ICreateRepositoryDTO): Promise<Subscriber>;
  import(data: ICreateRepositoryDTO[]): Promise<void>;
  save(subscriber: Subscriber): Promise<Subscriber>;
}
