import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { AccountStatusEnum } from 'src/domain/enums/account-status.enum';
import { ClientModel } from './client.model';

@Table({
  tableName: 'accounts',
  timestamps: true,
  paranoid: true,
})
export class AccountModel extends Model<AccountModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => ClientModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  clientId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  number: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  balance: number;

  @Column({
    type: DataType.ENUM(...Object.values(AccountStatusEnum)),
    allowNull: false,
  })
  status: AccountStatusEnum;

  @BelongsTo(() => ClientModel)
  client: ClientModel;
}
