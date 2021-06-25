import { getRepository, Repository } from 'typeorm';
import IDistributionRepository from '../../../repositories/IDistributionRepository';
import Distribution from '../entities/Distribution';

class DistributionRepository implements IDistributionRepository {
  private ormRepository: Repository<Distribution>;

  constructor() {
    this.ormRepository = getRepository(Distribution);
  }

  public async findById(id: string): Promise<Distribution | undefined> {
    const distribution = await this.ormRepository.findOne(id);

    return distribution;
  }

  public async create(description: string): Promise<Distribution> {
    const distribution = this.ormRepository.create({ description });

    await this.ormRepository.save(distribution);

    return distribution;
  }

  public async save(distribution: Distribution): Promise<Distribution> {
    return this.ormRepository.save(distribution);
  }
}

export default DistributionRepository;
