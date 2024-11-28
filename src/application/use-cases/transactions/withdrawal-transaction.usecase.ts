import { Injectable, NotFoundException } from '@nestjs/common';
import { WithdrawalTransactionDto } from 'src/application/dtos/transactions/withdrawal-transaction.dto';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';

@Injectable()
export class WithdrawalTransactionUseCase {
  constructor(private readonly accountsRepository: IAccountRepository) {}

  async execute(
    withdrawalTransactionDto: WithdrawalTransactionDto,
  ): Promise<void> {
    const account = await this.accountsRepository.findByNumber(
      withdrawalTransactionDto.accountNumber,
    );

    if (!account) {
      throw new NotFoundException('Account Withdrawal not found');
    }
  }
}
