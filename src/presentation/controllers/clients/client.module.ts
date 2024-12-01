import { Module } from '@nestjs/common';
import { CreateClientUseCase } from '@/application/use-cases/clients/create-client.usecase';
import { CreateClientController } from './create-client.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModel } from '@/infrastructure/database/sequelize/models/client.model';
import { ClientRepository } from '@/infrastructure/repositories/sequelize/client.repository';
import { GetByIdClientController } from './get-by-id-client.controller';
import { GetByIdClientUseCase } from '@/application/use-cases/clients/get-by-id-client.usecase';
import { CreateAccountClientUseCase } from '@/application/use-cases/clients/create-account-client.usecase';
import { CreateAccountClientController } from './create-account-client.controller';
import { AccountRepository } from '@/infrastructure/repositories/sequelize/account.repository';
import { AccountModel } from '@/infrastructure/database/sequelize/models/account.model';
import { IClientRepository } from '@/domain/repositories/iclient.repository';
import { IAccountRepository } from '@/domain/repositories/iaccount.repository';
import { TransactionModel } from '@/infrastructure/database/sequelize/models/transaction.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([ClientModel, AccountModel, TransactionModel]),
  ],
  controllers: [
    CreateClientController,
    GetByIdClientController,
    CreateAccountClientController,
  ],
  providers: [
    {
      provide: IClientRepository,
      useClass: ClientRepository,
    },
    {
      provide: IAccountRepository,
      useClass: AccountRepository,
    },
    CreateClientUseCase,
    GetByIdClientUseCase,
    CreateAccountClientUseCase,
    JwtService,
  ],
  exports: [
    {
      provide: IClientRepository,
      useClass: ClientRepository,
    },
    JwtService,
  ],
})
export class ClientModule {}
