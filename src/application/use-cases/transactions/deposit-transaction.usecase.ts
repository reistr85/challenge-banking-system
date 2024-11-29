import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DepositTransactionDto } from 'src/application/dtos/transactions/deposit-transaction.dto';
import { DepositedTransactionDto } from 'src/application/dtos/transactions/deposited-transaction.dto';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { TransactionTypeEnum } from 'src/domain/enums/transaction-type.enum';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';

@Injectable()
export class DepositTransactionUseCase {
  constructor(private readonly accountsRepository: IAccountRepository) {}

  async execute(
    depositTransactionDto: DepositTransactionDto,
  ): Promise<DepositedTransactionDto> {
    const account = await this.accountsRepository.findByNumber(
      depositTransactionDto.accountNumber,
    );

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const accountEntity = new AccountEntity(account);
    const deposited = accountEntity.deposit(depositTransactionDto.value);

    if (!deposited) {
      throw new InternalServerErrorException('Error depositing value');
    }

    const updatedAccount = await this.accountsRepository.update(
      accountEntity.id,
      {
        balance: accountEntity.balance,
      },
    );

    if (!updatedAccount) {
      throw new InternalServerErrorException('Error updating balance');
    }

    const transaction = await this.accountsRepository.createTransaction({
      accountNumberRecipient: accountEntity.number,
      type: TransactionTypeEnum.DEPOSIT,
      value: depositTransactionDto.value,
    });

    if (!transaction) {
      throw new InternalServerErrorException('Error creating transaction');
    }

    return DepositedTransactionDto.toDto({
      proof: transaction.id,
    });
  }
}
