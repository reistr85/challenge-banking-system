import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositTransactionDto } from 'src/application/dtos/transactions/deposit-transaction.dto';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';

@Injectable()
export class DepositTransactionUseCase {
  constructor(private readonly accountsRepository: IAccountRepository) {}

  async execute(depositTransactionDto: DepositTransactionDto): Promise<void> {
    const account = await this.accountsRepository.findByNumber(
      depositTransactionDto.accountNumber,
    );

    if (!account) {
      throw new NotFoundException('Account not found');
    }
  }
}
