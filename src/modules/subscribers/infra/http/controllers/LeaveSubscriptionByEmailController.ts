import { Request, Response } from 'express';
import { container } from 'tsyringe';
import LeaveSubscriptionByEmailService from '@modules/subscribers/services/LeaveSubscriptionByEmailService';
import AppError from '@shared/errors/AppError';

export default class LeaveSubscriptionByEmailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;

    if (!email) {
      throw new AppError('miss information');
    }
    const leaveSubscriptionService = container.resolve(
      LeaveSubscriptionByEmailService,
    );

    await leaveSubscriptionService.execute({
      email: email.toString(),
    });

    return response.send(
      `Pronto, o e-mail ${email}, foi desativado para novas notificações!!`,
    );
  }
}
