import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class TransferTransactionDto {
  @IsNumber()
  @ApiProperty({
    description: 'Number of the origin account',
    example: 1052548,
    required: true,
  })
  @Expose()
  accountNumberOrigin: number;

  @IsNumber()
  @ApiProperty({
    description: 'Number of the recipient account',
    example: 1052548,
    required: true,
  })
  @Expose()
  accountNumberRecipient: number;

  @IsNumber()
  @ApiProperty({
    description: 'Value to transfer',
    example: 1052548,
    required: true,
  })
  @Expose()
  value: number;
}
