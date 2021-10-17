import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IMessageJob } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import AppError from '@shared/errors/AppError';
import IViewsRepository from '@modules/views/repositories/IViewsRepository';
import ISubscriberRepository from '../repositories/ISubscriberRepository';
import IDistributionContactRepository from '../repositories/IDistributionContactRepository';
import IDistributionRepository from '../repositories/IDistributionRepository';

interface IRequest {
  distribution_id: string;
}

interface IGroupFrom {
  subscriberId: string;
  group: {
    groupName: string;
    groupEmail: string;
    subscriptionDate: Date;
  };
}

@injectable()
export default class SendNotificationEmailService {
  constructor(
    @inject('SubscriberRepository')
    private subscribersRepository: ISubscriberRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('QueueProvider')
    private queueProvider: IQueueProvider,

    @inject('DistributionRepository')
    private distributionRepository: IDistributionRepository,

    @inject('DistributionContactRepository')
    private distributionContactRepository: IDistributionContactRepository,

    @inject('ViewsRepository')
    private viewsRepository: IViewsRepository,
  ) {}

  public async execute({ distribution_id }: IRequest): Promise<void> {
    const distribution = await this.distributionRepository.findById(
      distribution_id,
    );
    if (!distribution) {
      throw new AppError('the distribution code informed is invalid');
    }

    const { view_id, subject } = distribution;

    const view = await this.viewsRepository.findById(view_id);

    if (!view) {
      throw new AppError(
        'The view used at this distributin is no more available',
      );
    }
    const { path } = view;
    const distributionContacts = await this.distributionContactRepository.findNoNotificatedContactsByDistribution(
      distribution_id,
    );

    const messages: IMessageJob[] = distributionContacts.map(subscription => {
      return {
        from: {
          name: subscription.group.name,
          email: subscription.group.email,
        },
        contact: {
          email: subscription.subscriber.email,
          name: subscription.subscriber.name,
        },
        id: subscription.subscriber.id,
        distributionId: distribution_id,
        subject,
        view: path,
      };
    });

    await this.queueProvider.add(messages);
  }
}
