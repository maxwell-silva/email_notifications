import { Request, Response } from 'express';
import { container } from 'tsyringe';
import LeaveSubscriptionService from '@modules/subscribers/services/LeaveSubscriptionService';

export default class LeaveSubscriptionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const leaveSubscriptionService = container.resolve(
      LeaveSubscriptionService,
    );

    await leaveSubscriptionService.execute({
      id: token,
    });

    return response.status(204).json();
  }
}
