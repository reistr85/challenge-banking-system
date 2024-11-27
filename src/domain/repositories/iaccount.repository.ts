import { AccountModel } from 'src/infrastructure/database/sequelize/models/account.model';
import { AccountEntity } from '../entities/account.entity';

export abstract class IAccountRepository {
  abstract create(data: Partial<AccountEntity>): Promise<AccountModel>;
  abstract findAll(): Promise<AccountModel[]>;
  abstract findById(id: string): Promise<AccountModel | null>;
  abstract update(
    id: string,
    data: Partial<AccountModel>,
  ): Promise<[number, AccountModel[]]>;
  abstract delete(id: string): Promise<number>;
}
