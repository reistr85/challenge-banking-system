import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class CreateAccountDto {
  @IsUUID()
  @ApiProperty({
    description: 'Number of the account',
    example: 1052548,
    required: true,
  })
  @Expose()
  clientId: string;
}
