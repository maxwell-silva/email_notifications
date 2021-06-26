import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IMessageJob } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import path from 'path';
import '@shared/infra/typeorm';

import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IMessageCache {
  deliveryStatus: boolean;
  deliveryFailure: boolean;
}

@injectable()
export default class ProcessQueueService {
  constructor(
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  execute(): void {
    this.queueProvider.process(async job => {
      const { contact, distributionId } = job.data as IMessageJob;
      const { email } = contact;

      const key = `mail-${distributionId}:${email}`;
      const emailCache = await this.cacheProvider.recover<IMessageCache>(key);

      if (emailCache) {
        throw new AppError('This email already tried!');
      }

      try {
        const invitedTemplate = path.resolve(
          __dirname,
          '..',
          'views',
          'invited_IOExtended.hbs',
        );

        await this.mailProvider.sendMail({
          to: {
            name: contact.name,
            email: contact.email,
          },
          subject: '[Google I/O Extended 2021] Inscreva-se',
          templateData: {
            file: invitedTemplate,
            variables: {
              name: contact.name,
            },
          },
        });
      } catch (err) {
        await this.cacheProvider.save(key, {
          deliveryStatus: false,
          deliveryFailure: true,
        });
        console.log(err);
        throw new AppError('Algo deu errado');
      }
      console.log(`eiiiiii`)
      await this.cacheProvider.save(key, {
        deliveryStatus: true,
        deliveryFailure: false,
      });
    });
  }
}
