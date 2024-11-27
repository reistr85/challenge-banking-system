import { AccountModel } from 'src/infrastructure/database/sequelize/models/account.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { ClientModel } from 'src/infrastructure/database/sequelize/models/client.model';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(AccountModel)
    private readonly accountModel: typeof AccountModel,
  ) {}

  async create(data: Partial<AccountEntity>): Promise<AccountModel> {
    return this.accountModel.create(data);
  }

  async findAll(): Promise<AccountModel[]> {
    return this.accountModel.findAll();
  }

  async findById(id: string): Promise<AccountModel | null> {
    return this.accountModel.findByPk(id, {
      include: [ClientModel],
    });
  }

  async findByNumber(number: number): Promise<AccountModel | null> {
    return this.accountModel.findOne({ where: { number } });
  }

  async update(
    id: string,
    data: Partial<AccountModel>,
  ): Promise<[number, AccountModel[]]> {
    return this.accountModel.update(data, { where: { id }, returning: true });
  }

  async delete(id: string): Promise<number> {
    return this.accountModel.destroy({ where: { id } });
  }
}
