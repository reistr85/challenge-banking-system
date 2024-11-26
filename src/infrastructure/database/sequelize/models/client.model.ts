import { Table, Column, Model, DataType } from 'sequelize-typescript';

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
  })
  cpf: string;
}
