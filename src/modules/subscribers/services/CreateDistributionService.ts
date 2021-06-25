import { injectable, inject } from 'tsyringe';
import IDistributionRepository from '../repositories/IDistributionRepository';
import Distribution from '../infra/typeorm/entities/Distribution';


interface IRequest {
  description: string;
}

@injectable()
export default class ProcessQueueService {
  constructor(
    @inject('DistributionRepository')
    private distributionRepository: IDistributionRepository,
  ) {}

  execute({description}: IRequest): Promise<Distribution> {
    const distribution = await this.distributionContactRepository.create(description);

    return distribution;
  }
}
