import { Injectable, NotFoundException } from '@nestjs/common';
import { GetByIdClientDto } from 'src/application/dtos/clients/get-by-id-client.dto';
import { ClientRepository } from 'src/infrastructure/repositories/sequelize/client.repository';

@Injectable()
export class GetByIdClientUseCase {
  constructor(private readonly clientsRepository: ClientRepository) {}

  async execute(id: string): Promise<GetByIdClientDto> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return GetByIdClientDto.toDto(client);
  }
}
