import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { CreatedClientDto } from './created-client.dto';
import { GetByIdAccountDto } from '../accounts/get-by-id-account.dto';
import { IsObject } from 'class-validator';

export class GetByIdClientDto extends PickType(CreatedClientDto, [
  'id',
  'name',
  'cpf',
  'phone',
]) {
  @IsObject()
  @ApiProperty({
    description: 'Accounts of the client',
    example: {
      id: 'uuid',
      number: 'string',
      balance: 0,
      status: 'string',
    },
    required: true,
  })
  @Expose()
  accounts: [];

  static toDto(data): GetByIdClientDto {
    return plainToInstance(
      GetByIdClientDto,
      {
        id: data.id,
        name: data.name,
        cpf: data.cpf,
        phone: data.phone,
        accounts: data.accounts.map((account) => {
          return {
            id: account.id,
            number: account.number,
            balance: account.balance,
            status: account.status,
          };
        }),
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
