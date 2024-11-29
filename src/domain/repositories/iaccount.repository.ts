import { AccountModel } from 'src/infrastructure/database/sequelize/models/account.model';
import { AccountEntity } from '../entities/account.entity';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionModel } from 'src/infrastructure/database/sequelize/models/transaction.model';

export abstract class IAccountRepository {
  abstract create(data: Partial<AccountEntity>): Promise<AccountModel>;
  abstract findAll(): Promise<AccountModel[]>;
  abstract findById(id: string): Promise<AccountModel | null>;
  abstract findByNumber(number: number): Promise<AccountModel | null>;
  abstract update(
    id: string,
    data: Partial<AccountModel>,
  ): Promise<[number, AccountModel[]]>;
  abstract delete(id: string): Promise<number>;
  abstract createTransaction(
    data: Partial<TransactionEntity>,
  ): Promise<TransactionModel>;
}
