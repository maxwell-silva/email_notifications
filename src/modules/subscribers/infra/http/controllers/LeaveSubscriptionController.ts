import { Request, Response } from 'express';
import { container } from 'tsyringe';
import LeaveSubscriptionService from '@modules/subscribers/services/LeaveSubscriptionService';
import AppError from '@shared/errors/AppError';

export default class LeaveSubscriptionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { dist, id } = request.query;

    if (!dist || !id) {
      throw new AppError('miss information');
    }
    const leaveSubscriptionService = container.resolve(
      LeaveSubscriptionService,
    );

    await leaveSubscriptionService.execute({
      dist: dist.toString(),
      id: id.toString(),
    });

    return response.send('pronto, suas informações foram excluidas da base');
  }
}
