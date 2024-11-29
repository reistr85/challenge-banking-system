import { TransactionTypeEnum } from '../enums/transaction-type.enum';

export class TransactionEntity {
  private id?: string;
  private accountNumberOrigin?: string;
  private accountNumberRecipient: number;
  private type: TransactionTypeEnum;
  private value: number;

  constructor({
    accountNumberOrigin,
    accountNumberRecipient,
    type,
    value,
  }: {
    accountNumberOrigin?: string;
    accountNumberRecipient: number;
    type: TransactionTypeEnum;
    value: number;
  }) {
    this.accountNumberOrigin = accountNumberOrigin;
    this.accountNumberRecipient = accountNumberRecipient;
    this.type = type;
    this.value = value;
  }
}
