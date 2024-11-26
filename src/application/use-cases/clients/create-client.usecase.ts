import { Injectable } from '@nestjs/common';
import { CreateClientDto } from 'src/application/dtos/clients/create-client.dto';
import { CreatedClientDto } from 'src/application/dtos/clients/created-client.dto';

@Injectable()
export class CreateClientUseCase {
  async execute(createClientDto: CreateClientDto): Promise<CreatedClientDto> {
    return await CreatedClientDto.toDto({
      name: createClientDto.name,
      cpf: createClientDto.cpf,
      phone: createClientDto.phone,
    });
  }
}
