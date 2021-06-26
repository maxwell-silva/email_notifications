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
          distributionId: distribution_id,
        });
      }
    });
    // const teste: IMessageJob[] = [
    //   // {
    //   //   contact: {
    //   //     email: 'fmsedrez@gmail.com',
    //   //     name: 'Sedrez',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'rodrigo.oliveira@unifeob.edu.br',
    //   //     name: 'Rodrigo Oliveira',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'elisabethmamede@gmail.com',
    //   //     name: 'Elisabeth',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'fmsedrez@kody.com.br',
    //   //     name: 'Sedrez',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'taciomedeiros@gmail.com',
    //   //     name: 'Tacio',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'shark.max@hotmail.com',
    //   //     name: 'Maxwell',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'carlos.stefan86@yahoo.com.br',
    //   //     name: 'Carlos',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   {
    //     contact: {
    //       email: 'maxwell.tj@hotmail.com',
    //       name: 'Maxwell',
    //     },
    //     distributionId: 'invitedTeste',
    //   },
    //   {
    //     contact: {
    //       email: 'maxwellsilva1993@gmail.com',
    //       name: 'Maxwell',
    //     },
    //     distributionId: 'invitedTeste',
    //   },
    // ];
    /**
     * step 1, obter contatos da lista de distribuição que ainda não receberam e-mail.
     * step 2, chamar queue provider e adicionar aos agendamentos
     *
     */
      console.log(messagesJob);
    await this.queueProvider.add(messagesJob);
  }
}
