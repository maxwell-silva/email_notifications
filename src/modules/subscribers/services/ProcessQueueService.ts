import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IMessageJob } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import path from 'path';

import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';

@injectable()
export default class ProcessQueueService {
  constructor(
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  execute(): void {
    /**
     * implementar garantia de que usuário ainda não recebeu email desta lista de distribuição
     */
    this.queueProvider.process(async job => {
      const { contact, distributionId } = job.data as IMessageJob;
      const id = distributionId || `asdasdasd`;
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
        console.log(err);
        // incluir servico ou repositório para gravar erro em distributionList

        throw err;
      }
    });
  }
}
