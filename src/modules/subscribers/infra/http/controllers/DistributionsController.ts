import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDistributionService from '@modules/subscribers/services/CreateDistributionService';

export default class NotificationsController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      description,
      groups,
      subject,
      viewId,
      excludSubscribersByGroup,
    } = request.body;

    const createDistributionService = container.resolve(
      CreateDistributionService,
    );

    const {
      distribution,
      amountOfEmails,
    } = await createDistributionService.execute({
      description,
      groups,
      subject,
      viewId,
      excludSubscribersByGroup,
    });

    return response.json({
      amountOfEmails,
      distribution,
    });
  }
}
