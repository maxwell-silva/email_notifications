import ICreateViewDTO from '@modules/views/dtos/ICreateViewDTO';
import IViewsRepository from '@modules/views/repositories/IViewsRepository';
import { getRepository, Repository } from 'typeorm';
import Views from '../entities/Views';

class ViewRepository implements IViewsRepository {
  private ormRepository: Repository<Views>;

  constructor() {
    this.ormRepository = getRepository(Views);
  }

  public async findAllViews(): Promise<Views[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Views | undefined> {
    const view = await this.ormRepository.findOne(id);
    return view;
  }

  public async create({
    description,
    name,
    createdBy: created_by,
    path,
  }: ICreateViewDTO): Promise<Views> {
    const newView = this.ormRepository.create({
      description,
      name,
      created_by,
      path,
    });

    await this.ormRepository.save(newView);

    return newView;
  }

  public async save(view: Views): Promise<Views> {
    const saved = await this.ormRepository.save(view);
    return saved;
  }
}

export default ViewRepository;
