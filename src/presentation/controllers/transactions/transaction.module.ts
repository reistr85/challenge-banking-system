import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModel } from 'src/infrastructure/database/sequelize/models/account.model';
import { AccountRepository } from 'src/infrastructure/repositories/sequelize/account.repository';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';
import { DepositTransactionController } from './deposit-transaction.controller';
import { DepositTransactionUseCase } from 'src/application/use-cases/transactions/deposit-transaction.usecase';
import { TransferTransactionController } from './transfer-transaction.controller';
import { WithdrawalTransactionController } from './withdrawal-transaction.controller';
import { TransferTransactionUseCase } from 'src/application/use-cases/transactions/transfer-transaction.usecase';
import { WithdrawalTransactionUseCase } from 'src/application/use-cases/transactions/withdrawal-transaction.usecase';

@Module({
  imports: [SequelizeModule.forFeature([AccountModel])],
  controllers: [
    DepositTransactionController,
    TransferTransactionController,
    WithdrawalTransactionController,
  ],
  providers: [
    {
      provide: IAccountRepository,
      useClass: AccountRepository,
    },
    DepositTransactionUseCase,
    TransferTransactionUseCase,
    WithdrawalTransactionUseCase,
  ],
  exports: [],
})
export class TransactionModule {}
