import Distribution from '@modules/subscribers/infra/typeorm/entities/Distribution';

export default interface ISubscribersRepositorory {
  findById(id: string): Promise<Distribution | undefined>;
  create(description: string): Promise<Distribution>;
  save(distribution: Distribution): Promise<Distribution>;
}
