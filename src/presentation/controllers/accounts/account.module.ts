import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModel } from 'src/infrastructure/database/sequelize/models/account.model';
import { AccountRepository } from 'src/infrastructure/repositories/sequelize/account.repository';
import { GetByIdAccountController } from './get-by-id-account.controller';
import { GetByIdAccountUseCase } from 'src/application/use-cases/accounts/get-by-id-account.usecase';
import { CreateAccountController } from './create-account.controller';
import { IClientRepository } from 'src/domain/repositories/iclient.repository';
import { ClientRepository } from 'src/infrastructure/repositories/sequelize/client.repository';
import { ClientModel } from 'src/infrastructure/database/sequelize/models/client.model';
import { CreateAccountUseCase } from 'src/application/use-cases/accounts/create-account.usecase';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';
import { UpdateStatusAccountController } from './update-status-account.controller';
import { UpdateStatusAccountUseCase } from 'src/application/use-cases/accounts/update-status-account.usecase';

@Module({
  imports: [SequelizeModule.forFeature([AccountModel, ClientModel])],
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
