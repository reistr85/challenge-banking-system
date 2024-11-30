import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModel } from '@/infrastructure/database/sequelize/models/account.model';
import { AccountRepository } from '@/infrastructure/repositories/sequelize/account.repository';
import { GetByIdAccountController } from './get-by-id-account.controller';
import { GetByIdAccountUseCase } from '@/application/use-cases/accounts/get-by-id-account.usecase';
import { CreateAccountController } from './create-account.controller';
import { IClientRepository } from '@/domain/repositories/iclient.repository';
import { ClientRepository } from '@/infrastructure/repositories/sequelize/client.repository';
import { ClientModel } from '@/infrastructure/database/sequelize/models/client.model';
import { CreateAccountUseCase } from '@/application/use-cases/accounts/create-account.usecase';
import { IAccountRepository } from '@/domain/repositories/iaccount.repository';
import { UpdateStatusAccountController } from './update-status-account.controller';
import { UpdateStatusAccountUseCase } from '@/application/use-cases/accounts/update-status-account.usecase';
import { TransactionModel } from '@/infrastructure/database/sequelize/models/transaction.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AccountModel, ClientModel, TransactionModel]),
  ],
  controllers: [
    GetByIdAccountController,
    CreateAccountController,
    UpdateStatusAccountController,
  ],
  providers: [
    {
      provide: IAccountRepository,
      useClass: AccountRepository,
    },
    {
      provide: IClientRepository,
      useClass: ClientRepository,
    },
    GetByIdAccountUseCase,
    CreateAccountUseCase,
    UpdateStatusAccountUseCase,
  ],
  exports: [
    {
      provide: IAccountRepository,
      useClass: AccountRepository,
    },
  ],
})
export class AccountModule {}
