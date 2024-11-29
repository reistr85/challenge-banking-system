import { AccountModel } from 'src/infrastructure/database/sequelize/models/account.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { ClientModel } from 'src/infrastructure/database/sequelize/models/client.model';
import { TransactionModel } from 'src/infrastructure/database/sequelize/models/transaction.model';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(AccountModel)
    private readonly accountModel: typeof AccountModel,
    @InjectModel(TransactionModel)
    private readonly transactionModel: typeof TransactionModel,
  ) {}

  async create(data: Partial<AccountEntity>): Promise<AccountModel> {
    return await this.accountModel.create(data);
  }

  async findAll(): Promise<AccountModel[]> {
    return await this.accountModel.findAll();
  }

  async findById(id: string): Promise<AccountModel | null> {
    return await this.accountModel.findByPk(id, {
      include: [
        ClientModel,
        { model: TransactionModel, as: 'transactionsAsOrigin' },
        { model: TransactionModel, as: 'transactionsAsRecipient' },
      ],
    });
  }

  async findByNumber(number: number): Promise<AccountModel | null> {
    return await this.accountModel.findOne({ where: { number } });
  }

  async update(
    id: string,
    data: Partial<AccountEntity>,
  ): Promise<[number, AccountModel[]]> {
    return await this.accountModel.update(data, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: string): Promise<number> {
    return await this.accountModel.destroy({ where: { id } });
  }

  async createTransaction(
    data: Partial<TransactionEntity>,
  ): Promise<TransactionModel> {
    return await this.transactionModel.create(data);
  }
}
