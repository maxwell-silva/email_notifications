import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowSubscribersService from '@modules/subscribers/services/ShowSubscribersService';
import ShowSubscribersServiceByGroup from '@modules/subscribers/services/ShowSubscribersServiceByGroup';
import JoinSubscriptionService from '@modules/subscribers/services/JoinSubscriptionService';
import CleanSubscribersService from '@modules/subscribers/services/CleanSubscribersService';

export default class SubscriptionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, lastName, email, groupId } = request.body;

    const joinSubscriptionService = container.resolve(JoinSubscriptionService);

    await joinSubscriptionService.execute({
      name,
      lastName,
      email,
      groupId,
    });

    return response.status(204).json();
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { subscription_status } = request.body;

    const showSubscribersService = container.resolve(ShowSubscribersService);

    const subscribers = await showSubscribersService.execute({
      subscription_status,
    });

    return response.json(subscribers);
  }

  async get(request: Request, response: Response): Promise<Response> {
    const { groupId } = request.params;
    const showSubscribersServiceByGroup = container.resolve(
      ShowSubscribersServiceByGroup,
    );

    const subscribers = await showSubscribersServiceByGroup.execute({
      groupId,
    });

    return response.json(subscribers);
  }

  async clean(request: Request, response: Response): Promise<Response> {
    const cleanSubscribersService = container.resolve(CleanSubscribersService);

    await cleanSubscribersService.execute();

    return response.status(204).json();
  }
}
