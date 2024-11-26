import { ClientModel } from 'src/infrastructure/database/sequelize/models/client.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/domain/entities/client.entity';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectModel(ClientModel) private readonly clientModel: typeof ClientModel,
  ) {}

  async create(data: Partial<ClientEntity>): Promise<ClientModel> {
    console.log(data);
    return this.clientModel.create(data);
  }

  async findAll(): Promise<ClientModel[]> {
    return this.clientModel.findAll();
  }

  async findById(id: string): Promise<ClientModel | null> {
    return this.clientModel.findByPk(id);
  }

  async findByCpf(cpf: string): Promise<ClientModel | null> {
    return this.clientModel.findOne({ where: { cpf } });
  }

  async update(
    id: string,
    data: Partial<ClientModel>,
  ): Promise<[number, ClientModel[]]> {
    return this.clientModel.update(data, { where: { id }, returning: true });
  }

  async delete(id: string): Promise<number> {
    return this.clientModel.destroy({ where: { id } });
  }
}
