import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { TransactionTypeEnum } from '@/domain/enums/transaction-type.enum';
import { AccountModel } from './account.model';

@Table({
  tableName: 'transactions',
  timestamps: true,
  paranoid: true,
})
export class TransactionModel extends Model<TransactionModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  accountNumberOrigin: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountNumberRecipient: number;

  @Column({
    type: DataType.ENUM(...Object.values(TransactionTypeEnum)),
    allowNull: false,
  })
  type: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  value: number;

  originAccount: AccountModel;
  recipientAccount: AccountModel;
}
