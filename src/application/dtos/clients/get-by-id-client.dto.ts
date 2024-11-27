import { PickType } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { CreatedClientDto } from './created-client.dto';
import { GetByIdAccountDto } from '../accounts/get-by-id-account.dto';

export class GetByIdClientDto extends PickType(CreatedClientDto, [
  'id',
  'name',
  'cpf',
  'phone',
]) {
  @Expose()
  accounts: GetByIdAccountDto[];
  static toDto(data): GetByIdClientDto {
    return plainToInstance(
      GetByIdClientDto,
      {
        id: data.id,
        name: data.name,
        cpf: data.cpf,
        phone: data.phone,
        accounts: data.accounts.map((account) =>
          GetByIdAccountDto.toDto(account),
        ),
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
