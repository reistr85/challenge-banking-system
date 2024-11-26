import { ClientModel } from 'src/infrastructure/database/sequelize/models/client.model';
import { ClientEntity } from '../entities/client.entity';
import { InjectModel } from '@nestjs/sequelize';

export class ClientRepository {
  constructor(
    @InjectModel(ClientModel) private readonly clientModel: typeof ClientModel,
  ) {}

  async create(clientEntity: ClientEntity): Promise<ClientEntity> {
    return clientEntity;
  }

  async findAll(): Promise<ClientEntity[]> {
    return [];
  }

  async findById(id: string): Promise<ClientEntity> {
    return null;
  }

  async update(id: string, clientEntity: ClientEntity): Promise<ClientEntity> {
    return clientEntity;
  }

  async delete(id: string): Promise<void> {
    return;
  }
}
