import { BadRequestException } from '@nestjs/common';
import { AccountStatusEnum } from '../enums/account-status.enum';

export class AccountEntity {
  public id?: string;
  public clientId?: string;
  public number: number;
  public balance: number;
  public status: AccountStatusEnum;

  constructor({
    id,
    clientId,
    number,
    balance,
    status,
  }: {
    id?: string;
    clientId: string;
    number?: number;
    balance?: number;
    status?: AccountStatusEnum;
  }) {
    this.id = id ?? null;
    this.clientId = clientId;
    this.number = number ?? this.generateNumber();
    this.balance = balance ?? 0;
    this.status = status ?? AccountStatusEnum.ACTIVE;
  }

  private generateNumber(): number {
    return Math.floor(Math.random() * 999999);
  }

  public deposit(value: number): boolean {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater than zero');
    }

    if (!this.isActive()) {
      throw new BadRequestException('The account is not active');
    }

    this.balance = this.balance + value;

    return true;
  }

  public withdrawal(value: number): boolean {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater than zero');
    }

    if (!this.isActive()) {
      throw new BadRequestException('The account is not active');
    }

    this.balance = this.balance - value;

    if (this.balance < 0) {
      throw new BadRequestException('Insufficient balance');
    }

    return true;
  }

  public transfer(
    value: number,
    accountOrigin: number,
    accountRecipient: number,
    increment = false,
  ): boolean {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater than zero');
    }

    if (!this.isActive()) {
      throw new BadRequestException('The account is not active');
    }

    if (accountOrigin === accountRecipient) {
      throw new BadRequestException('The accounts must be different');
    }

    if (!increment) {
      value = value * -1;
    }

    this.balance = this.balance + value;

    if (this.balance < 0) {
      throw new BadRequestException('Insufficient balance');
    }

    return true;
  }

  private isActive(): boolean {
    return this.status === AccountStatusEnum.ACTIVE;
  }
}
