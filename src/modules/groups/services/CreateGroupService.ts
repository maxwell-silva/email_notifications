import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Group from '../infra/typeorm/entities/Group';
import IGroupRepositorory from '../repositories/IGroupRepository';

interface IRequest {
  description: string;
  ownerId: string;
  email: string;
  name: string;
}

@injectable()
export default class CreateDistributionService {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepositorory,
  ) {}

  public async execute({
    description,
    ownerId,
    email,
    name,
  }: IRequest): Promise<Group> {
    const existsEmail = await this.groupRepository.findByEmail(email);

    if (existsEmail) {
      throw new AppError(`The email ${email} already used by another group`);
    }

    const existsDescription = await this.groupRepository.findByDescription(
      description,
    );

    if (existsDescription) {
      throw new AppError(
        `The group description ${existsDescription} already used by another group`,
      );
    }
    const distribution = await this.groupRepository.create({
      description,
      ownerId,
      email,
      name,
    });

    return distribution;
  }
}
