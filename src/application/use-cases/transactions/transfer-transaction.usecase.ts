import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferTransactionDto } from 'src/application/dtos/transactions/transfer-transaction.dto';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';

@Injectable()
export class TransferTransactionUseCase {
  constructor(private readonly accountsRepository: IAccountRepository) {}

  async execute(transferTransactionDto: TransferTransactionDto): Promise<void> {
    const accountOrigin = await this.accountsRepository.findByNumber(
      transferTransactionDto.accountNumberOrigin,
    );

    if (!accountOrigin) {
      throw new NotFoundException('Account Origin not found');
    }
  }
}
