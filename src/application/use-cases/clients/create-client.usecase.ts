import { Injectable } from '@nestjs/common';
import { CreateClientDto } from '@/application/dtos/clients/create-client.dto';
import { CreatedClientDto } from '@/application/dtos/clients/created-client.dto';
import { ClientEntity } from '@/domain/entities/client.entity';
import { IClientRepository } from '@/domain/repositories/iclient.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientsRepository: IClientRepository) {}

  async execute(createClientDto: CreateClientDto): Promise<CreatedClientDto> {
    const clientEntity = new ClientEntity(createClientDto);

    const hashedPassword = await bcrypt.hash(createClientDto.password, 10);
    const clientCreated = await this.clientsRepository.create({
      ...clientEntity,
      password: hashedPassword,
    });

    return CreatedClientDto.toDto({ id: clientCreated.id, ...clientEntity });
  }
}
