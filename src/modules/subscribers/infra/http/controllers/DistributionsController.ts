import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDistributionService from '@modules/subscribers/services/CreateDistributionService';

export default class NotificationsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;

    const createDistributionService = container.resolve(
      CreateDistributionService,
    );

    await createDistributionService.execute({ description });

    return response.status(204).json();
  }
}
