import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class DepositedTransactionDto {
  @IsUUID()
  @ApiProperty({
    description: 'Proof of deposit',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @Expose()
  proof: number;

  static toDto(data): DepositedTransactionDto {
    return plainToInstance(DepositedTransactionDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
