import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { AccountStatusEnum } from 'src/domain/enums/account-status.enum';

export class CreateAccountDto {
  @IsNumber()
  @ApiProperty({
    description: 'Number of the account',
    example: 1052548,
    required: true,
  })
  @Expose()
  number: number;

  @IsNumber()
  @ApiProperty({
    description: 'Balance of the account',
    example: 1500.5,
    required: true,
  })
  @Expose()
  balance: number;

  @IsEnum(AccountStatusEnum)
  @ApiProperty({
    description: 'Status of the account',
    example: AccountStatusEnum.ACTIVE,
    required: true,
  })
  @Expose()
  status: AccountStatusEnum;
}
