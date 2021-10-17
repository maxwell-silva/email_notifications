import { Request, Response } from 'express';
import { container } from 'tsyringe';
import LeaveSubscriptionByEmailsService from '@modules/subscribers/services/LeaveSubscriptionByEmailsService';
import AppError from '@shared/errors/AppError';

export default class LeaveSubscriptionByEmailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { emails }: { emails: string[] } = request.body;

    if (!emails.length) {
      throw new AppError('miss information');
    }
    const leaveSubscriptionService = container.resolve(
      LeaveSubscriptionByEmailsService,
    );

    await leaveSubscriptionService.execute({
      emails,
    });

    return response.send(
      `Pronto, o e-mails ${String(
        emails,
      )}, foram desativados para novas notificações!!`,
    );
  }
}
