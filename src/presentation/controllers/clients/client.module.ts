import { Module } from '@nestjs/common';
import { CreateClientUseCase } from 'src/application/use-cases/clients/create-client.usecase';
import { CreateClientController } from './create-client.controller';

@Module({
  imports: [],
  controllers: [CreateClientController],
  providers: [CreateClientUseCase],
})
export class ClientModule {}
