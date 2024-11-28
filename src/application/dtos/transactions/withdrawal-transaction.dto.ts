import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class WithdrawalTransactionDto {
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
    description: 'Value to withdrawal',
    example: 10.0,
    required: true,
  })
  @Expose()
  value: number;
}
