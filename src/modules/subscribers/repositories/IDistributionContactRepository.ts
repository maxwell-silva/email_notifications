import Distribution from '@modules/subscribers/infra/typeorm/entities/Distribution';
import DistributionContact from '@modules/subscribers/infra/typeorm/entities/DistributionContact';

export default interface ISubscribersRepositorory {
  findByEmailAndDistribution(email: string, distribution_id): Promise<DistributionContact | undefined>;
  create(distribution: Distribution): Promise<DistributionContact[]>;
  save(distributionContact: DistributionContact): Promise<DistributionContact>;
  findNoNotificatedContactsByDistribution(distribution: Distribution): Promise<DistributionContact[]>;
}
