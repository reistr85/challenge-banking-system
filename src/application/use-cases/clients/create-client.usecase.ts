import { Injectable } from '@nestjs/common';
import { CreateClientDto } from 'src/application/dtos/clients/create-client.dto';
import { CreatedClientDto } from 'src/application/dtos/clients/created-client.dto';
import { ClientEntity } from 'src/domain/entities/client.entity';
import { ClientRepository } from 'src/infrastructure/repositories/sequelize/client.repository';

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientsRepository: ClientRepository) {}

  async execute(createClientDto: CreateClientDto): Promise<CreatedClientDto> {
    const clientEntity = new ClientEntity(createClientDto);
    const clientCreated = await this.clientsRepository.create(clientEntity);

    return CreatedClientDto.toDto({ id: clientCreated.id, ...clientEntity });
  }
}
