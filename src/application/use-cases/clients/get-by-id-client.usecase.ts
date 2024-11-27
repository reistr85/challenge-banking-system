import { Injectable, NotFoundException } from '@nestjs/common';
import { GetByIdClientDto } from 'src/application/dtos/clients/get-by-id-client.dto';
import { IClientRepository } from 'src/domain/repositories/iclient.repository';

@Injectable()
export class GetByIdClientUseCase {
  constructor(private readonly clientsRepository: IClientRepository) {}

  async execute(id: string): Promise<GetByIdClientDto> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return GetByIdClientDto.toDto(client);
  }
}
