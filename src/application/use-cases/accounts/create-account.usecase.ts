import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from '@/application/dtos/accounts/create-account.dto';
import { CreatedAccountDto } from '@/application/dtos/accounts/created-account.dto';
import { AccountEntity } from '@/domain/entities/account.entity';
import { IAccountRepository } from '@/domain/repositories/iaccount.repository';
import { IClientRepository } from '@/domain/repositories/iclient.repository';

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

    const accountEntity = new AccountEntity(createAccountDto);
    delete accountEntity.id;
    const accountCreated = await this.accountsRepository.create(accountEntity);

    return CreatedAccountDto.toDto({ id: accountCreated.id, ...accountEntity });
  }
}
