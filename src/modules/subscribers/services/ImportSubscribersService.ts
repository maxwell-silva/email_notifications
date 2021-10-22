import IGroupRepository from '@modules/groups/repositories/IGroupRepository';
import ISubscribersGroupRepository from '@modules/groups/repositories/ISubscribersGroupRepository';
import AppError from '@shared/errors/AppError';
import csvParse from 'csv-parse';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import Subscriber from '../infra/typeorm/entities/Subscriber';
import ISubscriberRepository from '../repositories/ISubscriberRepository';

interface ICSVImport {
  seq: string;
  name: string;
  email: string;
}

@injectable()
export default class CreateDistributionService {
  constructor(
    @inject('SubscriberRepository')
    private subscriberRepository: ISubscriberRepository,

    @inject('GroupRepository')
    private groupRepository: IGroupRepository,

    @inject('SubscribersGroupRepository')
    private subscribersGroupRepository: ISubscribersGroupRepository,
  ) {}

  public async execute(
    filePath: string,
    groupId: string,
    renewSubscription: boolean,
  ): Promise<void> {
    const contactsReadStream = fs.createReadStream(filePath);

    const group = await this.groupRepository.findById(groupId);

    if (!group) {
      throw new AppError('Invalid Group to import');
    }

    const parseStream = csvParse({
      from_line: 1,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = contactsReadStream.pipe(parseStream);

    const subscribers: ICSVImport[] = [];

    parseCSV.on('data', line => {
      const [seq, name, email] = line.map((cell: string) => cell);
      subscribers.push({ seq, name, email });
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    const CSVSubscribers = subscribers.reduce(
      (result: ICSVImport[], currentValue: ICSVImport) => {
        return result.find(e => e.email === currentValue.email)
          ? result
          : [...result, currentValue];
      },
      [],
    );

    const alreadyExists = await this.subscriberRepository.findByEmails(
      CSVSubscribers.map(e => {
        return e.email;
      }),
    );

    if (renewSubscription) {
      const renewSubscriptions: Subscriber[] = alreadyExists.map(e => {
        return {
          ...e,
          subscription_status: true,
        };
      });

      await this.subscriberRepository.save(renewSubscriptions);
    }

    const existsEmails = alreadyExists.map(e => e.email);

    const subscribersToImport = CSVSubscribers.filter(
      subscriber => !existsEmails.includes(subscriber.email),
    );

    const subscribersImported = await this.subscriberRepository.import(
      subscribersToImport.map(e => ({
        name: e.name,
        email: e.email,
      })),
    );

    const addSubscribersToGroup = [...alreadyExists, ...subscribersImported];

    await this.subscribersGroupRepository.import(
      addSubscribersToGroup.map(e => ({
        group_id: groupId,
        subscriber_id: e.id,
        subscription_status: true,
      })),
    );
  }
}
