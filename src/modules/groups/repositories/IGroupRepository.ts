import ICreateGroupDTO from '../dtos/ICreateGroupDTO';
import Group from '../infra/typeorm/entities/Group';

export default interface IGroupRepositorory {
  findAllGroups(): Promise<Group[]>;
  findById(id: string): Promise<Group | undefined>;
  findByOwnerId(id: string): Promise<Group[]>;
  findByEmail(email: string): Promise<Group | undefined>;
  findByDescription(description: string): Promise<Group | undefined>;
  create(data: ICreateGroupDTO): Promise<Group>;
  save(group: Group): Promise<Group>;
}
