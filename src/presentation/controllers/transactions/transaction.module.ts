import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModel } from 'src/infrastructure/database/sequelize/models/account.model';
import { AccountRepository } from 'src/infrastructure/repositories/sequelize/account.repository';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';
import { DepositTransactionController } from './deposit-transaction.controller';
import { DepositTransactionUseCase } from 'src/application/use-cases/transactions/deposit-transaction.usecase';

@Module({
  imports: [SequelizeModule.forFeature([AccountModel])],
  controllers: [DepositTransactionController],
  providers: [
    {
      provide: IAccountRepository,
      useClass: AccountRepository,
    },
    DepositTransactionUseCase,
  ],
  exports: [],
})
export class TransactionModule {}
