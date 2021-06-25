import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IMessageJob } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import path from 'path';

import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import AppError from '@shared/errors/AppError';
import IDistributionContactRepository from '../repositories/IDistributionContactRepository';

@injectable()
export default class ProcessQueueService {
  constructor(
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('DistributionContactRepository')
    private distributionContactRepository: IDistributionContactRepository,
  ) {}

  execute(): void {
    this.queueProvider.process(async job => {
      const { contact, distributionId } = job.data as IMessageJob;
      const { email } = contact;

      const distributionContact = await this.distributionContactRepository.findByEmailAndDistribution(
        email,
        distributionId,
      );

      if (!distributionContact) {
        throw new AppError('No Exists');
      }
      const {
        delivery_status,
        delivery_failure,
        unsubscription,
      } = distributionContact;

      if (delivery_status || delivery_failure || unsubscription) {
        throw new AppError('This already happen');
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
        distributionContact.delivery_failure = true;
        distributionContact.error = err;
        await this.distributionContactRepository.save(distributionContact);
        console.log(err);
        throw new AppError('Algo deu errado');
      }
      distributionContact.delivery_status = true;
      await this.distributionContactRepository.save(distributionContact);
    });
  }
}
