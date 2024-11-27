import { AccountStatusEnum } from '../enums/account-status.enum';

export class AccountEntity {
  private id?: string;
  private clientId?: string;
  private number: number;
  private balance: number;
  private status: AccountStatusEnum;

  constructor(clientId: string) {
    this.clientId = clientId;
    this.number = this.generateNumber();
    this.balance = 0;
    this.status = AccountStatusEnum.ACTIVE;
  }

  private generateNumber(): number {
    return Math.floor(Math.random() * 999999);
  }
}
