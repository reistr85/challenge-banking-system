import { ClientModel } from 'src/infrastructure/database/sequelize/models/client.model';
import { ClientEntity } from '../entities/client.entity';

export abstract class IClientRepository {
  abstract create(data: Partial<ClientEntity>): Promise<ClientModel>;
  abstract findAll(): Promise<ClientModel[]>;
  abstract findById(id: string): Promise<ClientModel | null>;
  abstract update(
    id: string,
    data: Partial<ClientModel>,
  ): Promise<[number, ClientModel[]]>;
  abstract delete(id: string): Promise<number>;
}
