import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ImportViewService from '../../../services/ImportViewService';
import ShowViewsService from '../../../services/ShowViewsService';
import ShowViewByIdService from '../../../services/ShowViewByIdService';

export default class ImportController {
  async create(request: Request, response: Response): Promise<Response> {
    const importViewService = container.resolve(ImportViewService);

    const { description } = request.body;
    const { id } = request.user;

    await importViewService.execute({
      createdBy: id,
      description,
      name: request.file.filename,
      path: request.file.path,
    });

    return response.status(204).json();
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showViewsService = container.resolve(ShowViewsService);

    const views = await showViewsService.execute();

    return response.json(views);
  }

  async get(request: Request, response: Response): Promise<Response> {
    const showViewByIdService = container.resolve(ShowViewByIdService);
    const { id } = request.params;

    const views = await showViewByIdService.execute(id);

    return response.json(views);
  }
}
