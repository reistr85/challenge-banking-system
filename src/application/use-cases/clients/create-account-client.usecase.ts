import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatedAccountDto } from 'src/application/dtos/accounts/created-account.dto';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';
import { IClientRepository } from 'src/domain/repositories/iclient.repository';
import { AccountRepository } from 'src/infrastructure/repositories/sequelize/account.repository';

@Injectable()
export class CreateAccountClientUseCase {
  constructor(
    private readonly clientsRepository: IClientRepository,
    private readonly accountsRepository: IAccountRepository,
  ) {}

  async execute(clientId: string): Promise<CreatedAccountDto> {
    const client = await this.clientsRepository.findById(clientId);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const accountEntity = new AccountEntity({ clientId });
    const accountCreated = await this.accountsRepository.create(accountEntity);

    return CreatedAccountDto.toDto({ id: accountCreated.id, ...accountEntity });
  }
}
