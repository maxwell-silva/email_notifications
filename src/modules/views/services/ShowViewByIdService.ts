import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Views from '../infra/typeorm/entities/Views';
import IViewsRepository from '../repositories/IViewsRepository';

@injectable()
export default class CreateDistributionService {
  constructor(
    @inject('ViewsRepository')
    private viewsRepository: IViewsRepository,
  ) {}

  public async execute(id: string): Promise<Views> {
    const view = await this.viewsRepository.findById(id);

    if (!view) {
      throw new AppError('view not exists, check id informed');
    }
    return view;
  }
}
