import { Injectable, NotFoundException } from '@nestjs/common';
import { GetByIdAccountDto } from 'src/application/dtos/accounts/get-by-id-account.dto';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';

@Injectable()
export class GetByIdAccountUseCase {
  constructor(private readonly accountsRepository: IAccountRepository) {}

  async execute(id: string): Promise<GetByIdAccountDto> {
    const account = await this.accountsRepository.findById(id);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return GetByIdAccountDto.toDto(account);
  }
}
