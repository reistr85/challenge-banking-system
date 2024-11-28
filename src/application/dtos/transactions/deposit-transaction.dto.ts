import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DepositTransactionDto {
  @IsNumber()
  @ApiProperty({
    description: 'Number of the account',
    example: 1052548,
    required: true,
  })
  @Expose()
  accountNumber: number;

  @IsNumber()
  @ApiProperty({
    description: 'Value to deposit',
    example: 1052548,
    required: true,
  })
  @Expose()
  value: number;
}
