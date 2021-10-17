import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendNotificationEmailByJsonService from '@modules/subscribers/services/SendNotificationEmailByJsonService';

export default class NotificationsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { contacts, from, key, subject, viewId } = request.body;

    const sendNotificationEmailByJsonService = container.resolve(
      SendNotificationEmailByJsonService,
    );

    await sendNotificationEmailByJsonService.execute({
      contacts,
      from,
      key,
      subject,
      viewId,
    });

    return response.status(204).json();
  }
}
