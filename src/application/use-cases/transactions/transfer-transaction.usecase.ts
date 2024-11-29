import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TransferTransactionDto } from 'src/application/dtos/transactions/transfer-transaction.dto';
import { TransferredTransactionDto } from 'src/application/dtos/transactions/transferred-transaction.dto';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { TransactionTypeEnum } from 'src/domain/enums/transaction-type.enum';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';

@Injectable()
export class TransferTransactionUseCase {
  constructor(private readonly accountsRepository: IAccountRepository) {}

  async execute(
    transferTransactionDto: TransferTransactionDto,
  ): Promise<TransferredTransactionDto> {
    const accountOrigin = await this.accountsRepository.findByNumber(
      transferTransactionDto.accountNumberOrigin,
    );

    if (!accountOrigin) {
      throw new NotFoundException('Account Origin not found');
    }

    let accountEntity = new AccountEntity(accountOrigin);
    let transferred = accountEntity.transfer(
      transferTransactionDto.value,
      transferTransactionDto.accountNumberOrigin,
      transferTransactionDto.accountNumberRecipient,
    );

    if (!transferred) {
      throw new InternalServerErrorException('Error transferred value');
    }

    let updatedAccount = await this.accountsRepository.update(
      accountEntity.id,
      {
        balance: accountEntity.balance,
      },
    );

    if (!updatedAccount) {
      throw new InternalServerErrorException('Error updating balance');
    }

    const accountRecipient = await this.accountsRepository.findByNumber(
      transferTransactionDto.accountNumberRecipient,
    );

    if (!accountRecipient) {
      throw new NotFoundException('Account Recipient not found');
    }

    accountEntity = new AccountEntity(accountRecipient);
    transferred = accountEntity.transfer(
      transferTransactionDto.value,
      transferTransactionDto.accountNumberOrigin,
      transferTransactionDto.accountNumberRecipient,
      true,
    );

    if (!transferred) {
      throw new InternalServerErrorException('Error transferred value');
    }

    updatedAccount = await this.accountsRepository.update(accountEntity.id, {
      balance: accountEntity.balance,
    });

    if (!updatedAccount) {
      throw new InternalServerErrorException('Error updating balance');
    }

    const transaction = await this.accountsRepository.createTransaction({
      accountNumberOrigin: transferTransactionDto.accountNumberOrigin,
      accountNumberRecipient: transferTransactionDto.accountNumberRecipient,
      type: TransactionTypeEnum.TRANSFER,
      value: transferTransactionDto.value,
    });

    if (!transaction) {
      throw new InternalServerErrorException('Error creating transaction');
    }

    return TransferredTransactionDto.toDto({
      proof: transaction.id,
    });
  }
}
