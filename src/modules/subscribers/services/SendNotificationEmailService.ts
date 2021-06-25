// import User from '@modules/users/infra/typeorm/entities/User';
// import path from 'path';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { IMessageJob } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import ISubscriberRepository from '../repositories/ISubscriberRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('SubscribersRepository')
    private subscribersRepository: ISubscriberRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
  ) {}

  public async execute(): Promise<void> {
    const subscribers = await this.subscribersRepository.findAllSubscribers(
      true,
    );

    if (subscribers.length) {
      throw new AppError('non-existing subscribers');
    }
    const teste: IMessageJob[] = [
      // {
      //   contact: {
      //     email: 'fmsedrez@gmail.com',
      //     name: 'Sedrez',
      //   },
      //   distributionId: 'invitedTeste',
      // },
      // {
      //   contact: {
      //     email: 'rodrigo.oliveira@unifeob.edu.br',
      //     name: 'Rodrigo Oliveira',
      //   },
      //   distributionId: 'invitedTeste',
      // },
      // {
      //   contact: {
      //     email: 'elisabethmamede@gmail.com',
      //     name: 'Elisabeth',
      //   },
      //   distributionId: 'invitedTeste',
      // },
      // {
      //   contact: {
      //     email: 'fmsedrez@kody.com.br',
      //     name: 'Sedrez',
      //   },
      //   distributionId: 'invitedTeste',
      // },
      // {
      //   contact: {
      //     email: 'taciomedeiros@gmail.com',
      //     name: 'Tacio',
      //   },
      //   distributionId: 'invitedTeste',
      // },
      // {
      //   contact: {
      //     email: 'shark.max@hotmail.com',
      //     name: 'Maxwell',
      //   },
      //   distributionId: 'invitedTeste',
      // },
      // {
      //   contact: {
      //     email: 'carlos.stefan86@yahoo.com.br',
      //     name: 'Carlos',
      //   },
      //   distributionId: 'invitedTeste',
      // },
      {
        contact: {
          email: 'maxwell.tj@hotmail.com',
          name: 'Maxwell',
        },
        distributionId: 'invitedTeste',
      },
      {
        contact: {
          email: 'maxwellsilva1993@gmail.com',
          name: 'Maxwell',
        },
        distributionId: 'invitedTeste',
      },
    ];
    /**
     * step 1, obter contatos da lista de distribuição que ainda não receberam e-mail.
     * step 2, chamar queue provider e adicionar aos agendamentos
     *
     */

    await this.queueProvider.add(teste);
  }
}
