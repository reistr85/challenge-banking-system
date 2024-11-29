import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { CreatedAccountDto } from './created-account.dto';
import { IsArray, IsObject } from 'class-validator';

export class GetByIdAccountDto extends PickType(CreatedAccountDto, [
  'id',
  'number',
  'balance',
  'status',
]) {
  @IsObject()
  @ApiProperty({
    description: 'Client of the account',
    example: {
      id: 'uuid',
      name: 'string',
      cpf: 'string',
      phone: 'string',
    },
    required: true,
  })
  @Expose()
  client: any;

  @IsArray()
  @ApiProperty({
    description: 'Client of the account',
    example: {
      id: 'uuid',
      name: 'string',
      cpf: 'string',
      phone: 'string',
    },
    required: true,
  })
  @Expose()
  transactions: [];

  static toDto(data): GetByIdAccountDto {
    console.log(data.transactionsAsRecipient);

    const transactions = [
      ...data.transactionsAsRecipient.map((transaction) => ({
        id: transaction.id,
        accountNumberRecipient: transaction.accountNumberRecipient,
        type: transaction.type,
        value: transaction.value,
      })),
      ...data.transactionsAsOrigin.map((transaction) => ({
        id: transaction.id,
        accountNumberOrigin: transaction.accountNumberOrigin,
        type: transaction.type,
        value: transaction.value,
      })),
    ];

    return plainToInstance(
      GetByIdAccountDto,
      {
        id: data.id,
        number: data.number,
        balance: data.balance,
        status: data.status,
        client: {
          id: data.client.id,
          name: data.client.name,
          cpf: data.client.cpf,
          phone: data.client.phone,
        },
        transactions,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
