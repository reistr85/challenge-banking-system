import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatedAccountDto } from 'src/application/dtos/accounts/created-account.dto';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { AccountRepository } from 'src/infrastructure/repositories/sequelize/account.repository';
import { ClientRepository } from 'src/infrastructure/repositories/sequelize/client.repository';

@Injectable()
export class CreateAccountClientUseCase {
  constructor(
    private readonly clientsRepository: ClientRepository,
    private readonly accountsRepository: AccountRepository,
  ) {}

  async execute(clientId: string): Promise<CreatedAccountDto> {
    const client = await this.clientsRepository.findById(clientId);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const accountEntity = new AccountEntity(clientId);
    const accountCreated = await this.accountsRepository.create(accountEntity);

    return CreatedAccountDto.toDto({ id: accountCreated.id, ...accountEntity });
  }
}
