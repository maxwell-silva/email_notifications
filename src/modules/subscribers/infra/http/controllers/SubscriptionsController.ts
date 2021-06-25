import { Request, Response } from 'express';
import { container } from 'tsyringe';
import JoinSubscriptionService from '@modules/subscribers/services/JoinSubscriptionService';

export default class SubscriptionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const joinSubscriptionService = container.resolve(JoinSubscriptionService);

    await joinSubscriptionService.execute({
      name,
      email,
    });

    return response.status(204).json();
  }
}
