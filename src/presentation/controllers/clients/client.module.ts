import { Module } from '@nestjs/common';
import { CreateClientUseCase } from 'src/application/use-cases/clients/create-client.usecase';
import { CreateClientController } from './create-client.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModel } from 'src/infrastructure/database/sequelize/models/client.model';
import { ClientRepository } from 'src/infrastructure/repositories/sequelize/client.repository';
import { GetByIdClientController } from './get-by-id-client.controller';
import { GetByIdClientUseCase } from 'src/application/use-cases/clients/get-by-id-client.usecase';
import { CreateAccountClientUseCase } from 'src/application/use-cases/clients/create-account-client.usecase';
import { CreateAccountClientController } from './create-account-client.controller';
import { AccountRepository } from 'src/infrastructure/repositories/sequelize/account.repository';
import { AccountModel } from 'src/infrastructure/database/sequelize/models/account.model';

@Module({
  imports: [SequelizeModule.forFeature([ClientModel, AccountModel])],
  controllers: [
    CreateClientController,
    GetByIdClientController,
    CreateAccountClientController,
  ],
  providers: [
    ClientRepository,
    AccountRepository,
    CreateClientUseCase,
    GetByIdClientUseCase,
    CreateAccountClientUseCase,
  ],
  exports: [ClientRepository],
})
export class ClientModule {}
