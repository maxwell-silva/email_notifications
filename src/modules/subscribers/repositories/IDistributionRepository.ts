import Distribution from '@modules/subscribers/infra/typeorm/entities/Distribution';
import ICreateDistributionDTO from '../dtos/ICreateDistributionDTO';

export default interface ISubscribersRepositorory {
  findById(id: string): Promise<Distribution | undefined>;
  create(data: ICreateDistributionDTO): Promise<Distribution>;
  save(distribution: Distribution): Promise<Distribution>;
}
