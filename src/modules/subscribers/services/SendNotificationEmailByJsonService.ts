import { injectable, inject } from 'tsyringe';
import { IMessageJob } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import { ITemplateVariables } from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';
import IViewsRepository from '@modules/views/repositories/IViewsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  key: string;
  viewId: string;
  subject: string;
  from: {
    name: string;
    email: string;
  };
  contacts: Array<{
    name: string;
    email: string;
    variables: ITemplateVariables;
  }>;
}

@injectable()
export default class SendNotificationEmailService {
  constructor(
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,

    @inject('ViewsRepository')
    private viewsRepository: IViewsRepository,
  ) {}

  public async execute({
    key,
    viewId,
    subject,
    from,
    contacts,
  }: IRequest): Promise<void> {
    const view = await this.viewsRepository.findById(viewId);

    if (!view) {
      throw new AppError('view not exists, check the value informed');
    }
    const messages: IMessageJob[] = contacts.map(contact => {
      return {
        subject,
        from,
        contact: {
          email: contact.email,
          name: contact.name,
        },
        id: contact.email,
        distributionId: key,
        variables: contact.variables,
        view: view.path,
      };
    });

    await this.queueProvider.add(messages);
  }
}
