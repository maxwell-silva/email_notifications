import { injectable, inject } from 'tsyringe';
import Views from '../infra/typeorm/entities/Views';
import IViewsRepository from '../repositories/IViewsRepository';

interface IRequest {
  description: string;
  name: string;
  path: string;
  createdBy: string;
}

@injectable()
export default class CreateDistributionService {
  constructor(
    @inject('ViewsRepository')
    private viewsRepository: IViewsRepository,
  ) {}

  public async execute({
    description,
    name,
    path,
    createdBy,
  }: IRequest): Promise<Views> {
    const view = await this.viewsRepository.create({
      createdBy,
      description,
      name,
      path,
    });

    return view;
  }
}
