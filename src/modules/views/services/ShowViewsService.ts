import { injectable, inject } from 'tsyringe';
import Views from '../infra/typeorm/entities/Views';
import IViewsRepository from '../repositories/IViewsRepository';

@injectable()
export default class CreateDistributionService {
  constructor(
    @inject('ViewsRepository')
    private viewsRepository: IViewsRepository,
  ) {}

  public async execute(): Promise<Views[]> {
    const views = await this.viewsRepository.findAllViews();

    return views;
  }
}
