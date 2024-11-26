import { ClientEntity } from '../entities/client.entity';

export class ClientRepository {
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
