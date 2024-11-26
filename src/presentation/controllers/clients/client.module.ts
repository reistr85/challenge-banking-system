import { Module } from '@nestjs/common';
import { CreateClientUseCase } from 'src/application/use-cases/clients/create-client.usecase';
import { CreateClientController } from './create-client.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModel } from 'src/infrastructure/database/sequelize/models/client.model';
import { ClientRepository } from 'src/infrastructure/repositories/client.repository';
import { GetByIdClientController } from './get-by-id-client.controller';
import { GetByIdClientUseCase } from 'src/application/use-cases/clients/get-by-id-client.usecase';

@Module({
  imports: [SequelizeModule.forFeature([ClientModel])],
  controllers: [CreateClientController, GetByIdClientController],
  providers: [ClientRepository, CreateClientUseCase, GetByIdClientUseCase],
  exports: [ClientRepository],
})
export class ClientModule {}
