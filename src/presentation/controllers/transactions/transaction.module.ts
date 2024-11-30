import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModel } from '@/infrastructure/database/sequelize/models/account.model';
import { AccountRepository } from '@/infrastructure/repositories/sequelize/account.repository';
import { IAccountRepository } from '@/domain/repositories/iaccount.repository';
import { DepositTransactionController } from './deposit-transaction.controller';
import { DepositTransactionUseCase } from '@/application/use-cases/transactions/deposit-transaction.usecase';
import { TransferTransactionController } from './transfer-transaction.controller';
import { WithdrawalTransactionController } from './withdrawal-transaction.controller';
import { TransferTransactionUseCase } from '@/application/use-cases/transactions/transfer-transaction.usecase';
import { WithdrawalTransactionUseCase } from '@/application/use-cases/transactions/withdrawal-transaction.usecase';
import { TransactionModel } from '@/infrastructure/database/sequelize/models/transaction.model';

@Module({
  imports: [SequelizeModule.forFeature([AccountModel, TransactionModel])],
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
