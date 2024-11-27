import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from 'src/application/dtos/accounts/create-account.dto';
import { CreatedAccountDto } from 'src/application/dtos/accounts/created-account.dto';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';
import { IClientRepository } from 'src/domain/repositories/iclient.repository';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private readonly clientsRepository: IClientRepository,
    private readonly accountsRepository: IAccountRepository,
  ) {}

  async execute(
    createAccountDto: CreateAccountDto,
  ): Promise<CreatedAccountDto> {
    const client = await this.clientsRepository.findById(
      createAccountDto.clientId,
    );

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const accountEntity = new AccountEntity(createAccountDto.clientId);
    const accountCreated = await this.accountsRepository.create(accountEntity);

    return CreatedAccountDto.toDto({ id: accountCreated.id, ...accountEntity });
  }
}
