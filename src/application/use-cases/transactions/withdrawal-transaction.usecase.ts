import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { WithdrawalTransactionDto } from 'src/application/dtos/transactions/withdrawal-transaction.dto';
import { WithdrawnTransactionDto } from 'src/application/dtos/transactions/withdrawan-transaction.dto';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { TransactionTypeEnum } from 'src/domain/enums/transaction-type.enum';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';

@Injectable()
export class WithdrawalTransactionUseCase {
  constructor(private readonly accountsRepository: IAccountRepository) {}

  async execute(
    withdrawalTransactionDto: WithdrawalTransactionDto,
  ): Promise<WithdrawnTransactionDto> {
    const account = await this.accountsRepository.findByNumber(
      withdrawalTransactionDto.accountNumber,
    );

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const accountEntity = new AccountEntity(account);
    const deposited = accountEntity.withdrawal(withdrawalTransactionDto.value);

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
      type: TransactionTypeEnum.WITHDRAW,
      value: withdrawalTransactionDto.value,
    });

    if (!transaction) {
      throw new InternalServerErrorException('Error creating transaction');
    }

    return WithdrawnTransactionDto.toDto({
      proof: transaction.id,
    });
  }
}
