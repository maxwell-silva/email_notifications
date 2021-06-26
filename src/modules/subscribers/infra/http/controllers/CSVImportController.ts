import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ImportSubscribersService from '../../../services/ImportSubscribersService';

export default class ImportController {
  async create(request: Request, response: Response): Promise<Response> {
    const importSubscribersService = container.resolve(
      ImportSubscribersService,
    );

    await importSubscribersService.execute(request.file.path);

    return response.status(204).json();
  }
}
