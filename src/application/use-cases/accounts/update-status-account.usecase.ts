import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStatusAccountDto } from 'src/application/dtos/accounts/update-status-account.dto';
import { IAccountRepository } from 'src/domain/repositories/iaccount.repository';

@Injectable()
export class UpdateStatusAccountUseCase {
  constructor(private readonly accountsRepository: IAccountRepository) {}

  async execute(
    id: string,
    updateStatusAccountDto: UpdateStatusAccountDto,
  ): Promise<void> {
    const account = await this.accountsRepository.findById(id);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    await this.accountsRepository.update(id, updateStatusAccountDto);
  }
}
