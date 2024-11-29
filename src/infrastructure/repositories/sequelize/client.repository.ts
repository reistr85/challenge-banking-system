import { ClientModel } from 'src/infrastructure/database/sequelize/models/client.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/domain/entities/client.entity';
import { AccountModel } from 'src/infrastructure/database/sequelize/models/account.model';
import { IClientRepository } from 'src/domain/repositories/iclient.repository';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectModel(ClientModel) private readonly clientModel: typeof ClientModel,
  ) {}

  async create(data: Partial<ClientEntity>): Promise<ClientModel> {
    return await this.clientModel.create(data);
  }

  async findAll(): Promise<ClientModel[]> {
    return await this.clientModel.findAll();
  }

  async findById(id: string): Promise<ClientModel | null> {
    return await this.clientModel.findByPk(id, {
      include: [AccountModel],
    });
  }

  async findByCpf(cpf: string): Promise<ClientModel | null> {
    return await this.clientModel.findOne({ where: { cpf } });
  }

  async update(
    id: string,
    data: Partial<ClientModel>,
  ): Promise<[number, ClientModel[]]> {
    return await this.clientModel.update(data, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: string): Promise<number> {
    return await this.clientModel.destroy({ where: { id } });
  }
}
