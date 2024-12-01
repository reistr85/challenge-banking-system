import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { AccountModel } from './account.model';

@Table({
  tableName: 'clients',
  timestamps: true,
  paranoid: true,
})
export class ClientModel extends Model<ClientModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  cpf: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birth: string;

  @HasMany(() => AccountModel)
  accounts: AccountModel[];
}
