import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO';
import IGroupRepositorory from '@modules/groups/repositories/IGroupRepository';
import { getRepository, Repository } from 'typeorm';
import Group from '../entities/Group';

class GroupRepository implements IGroupRepositorory {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async findAllGroups(): Promise<Group[]> {
    const groups = await this.ormRepository.find();
    return groups;
  }

  public async findById(id: string): Promise<Group | undefined> {
    const groups = await this.ormRepository.findOne(id);
    return groups;
  }

  public async findByOwnerId(id: string): Promise<Group[]> {
    const groups = await this.ormRepository.find({ owner: id });

    return groups;
  }

  public async findByEmail(email: string): Promise<Group | undefined> {
    const group = await this.ormRepository.findOne({ email });

    return group;
  }

  public async findByDescription(
    description: string,
  ): Promise<Group | undefined> {
    const group = await this.ormRepository.findOne({ description });
    return group;
  }

  public async create(data: ICreateGroupDTO): Promise<Group> {
    const group = this.ormRepository.create({
      email: data.email,
      owner: data.ownerId,
      name: data.name,
      description: data.description,
    });

    await this.ormRepository.save(group);

    return group;
  }

  public async save(group: Group): Promise<Group> {
    await this.ormRepository.save(group);
    return group;
  }
}

export default GroupRepository;
