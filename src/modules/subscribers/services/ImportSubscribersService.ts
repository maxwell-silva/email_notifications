import csvParse from 'csv-parse';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
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
  ) {}

  public async execute(filePath: string): Promise<void> {
    const contactsReadStream = fs.createReadStream(filePath);

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

    const existsEmails = await this.subscriberRepository.findByEmails(
      CSVSubscribers.map(e => {
        return e.email;
      }),
    );

    const addSubscribers = CSVSubscribers.filter(
      subscriber => !existsEmails.includes(subscriber.email),
    );

    await this.subscriberRepository.import(
      addSubscribers.map(sub => ({
        name: sub.name,
        email: sub.email,
      })),
    );
  }
}
