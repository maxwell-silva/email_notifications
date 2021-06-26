// import User from '@modules/users/infra/typeorm/entities/User';
// import path from 'path';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IMessageJob } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import ISubscriberRepository from '../repositories/ISubscriberRepository';
import IDistributionContactRepository from '../repositories/IDistributionContactRepository';

interface IRequest {
  distribution_id: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('SubscriberRepository')
    private subscribersRepository: ISubscriberRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('QueueProvider')
    private queueProvider: IQueueProvider,

    @inject('DistributionContactRepository')
    private distributionContactRepository: IDistributionContactRepository,
  ) {}

  public async execute({ distribution_id }: IRequest): Promise<void> {
    const distributionContacts = await this.distributionContactRepository.findNoNotificatedContactsByDistribution(
      distribution_id,
    );
    const messagesJob: IMessageJob[] = [];
    distributionContacts.forEach(distributionContact => {
      if (
        distributionContact.subscriber?.name &&
        distributionContact.subscriber.email
      ) {
        messagesJob.push({
          contact: {
            email: distributionContact.subscriber.email,
            name: distributionContact.subscriber.name,
          },
          id: distributionContact.subscriber.id,
          distributionId: distribution_id,
        });
      }
    });

      console.log(messagesJob);
    await this.queueProvider.add(messagesJob);
  }
}
