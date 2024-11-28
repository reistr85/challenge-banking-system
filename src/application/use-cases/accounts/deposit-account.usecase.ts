import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositAccountDto } from 'src/application/dtos/accounts/deposit-account.dto';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';
import { IClientRepository } from 'src/domain/repositories/iclient.repository';

@Injectable()
export class DepositAccountUseCase {
  constructor(
    private readonly clientsRepository: IClientRepository,
    private readonly accountsRepository: IAccountRepository,
  ) {}

  async execute(
    id: string,
    depositAccountDto: DepositAccountDto,
  ): Promise<void> {
    const account = await this.accountsRepository.findById(id);

    if (!account) {
      throw new NotFoundException('Account not found');
    }
  }
}
