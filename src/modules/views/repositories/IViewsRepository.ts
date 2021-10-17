import ICreateViewDTO from '../dtos/ICreateViewDTO';
import Views from '../infra/typeorm/entities/Views';

export default interface IGroupRepositorory {
  findAllViews(): Promise<Views[]>;
  findById(id: string): Promise<Views | undefined>;
  create(data: ICreateViewDTO): Promise<Views>;
  save(view: Views): Promise<Views>;
}
