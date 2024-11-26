import { Module } from '@nestjs/common';
import { CreateClientUseCase } from 'src/application/use-cases/clients/create-client.usecase';
import { CreateClientController } from './create-client.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModel } from 'src/infrastructure/database/sequelize/models/client.model';
import { ClientRepository } from 'src/infrastructure/repositories/client.repository';
// import { ClientRepository } from 'src/infrastructure/repositories/client.repository';

@Module({
  imports: [SequelizeModule.forFeature([ClientModel])],
  controllers: [CreateClientController],
  providers: [ClientRepository, CreateClientUseCase],
  exports: [ClientRepository],
})
export class ClientModule {}
