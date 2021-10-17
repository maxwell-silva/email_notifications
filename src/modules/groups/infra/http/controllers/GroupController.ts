import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGroupService from '@modules/groups/services/CreateGroupService';

export default class GroupController {
  async create(request: Request, response: Response): Promise<Response> {
    const { description, email, name } = request.body;
    const { id: ownerId } = request.user;

    const createGroupService = container.resolve(CreateGroupService);

    const { id } = await createGroupService.execute({
      ownerId,
      description,
      email,
      name,
    });

    return response.json({
      id,
      description,
    });
  }
}
