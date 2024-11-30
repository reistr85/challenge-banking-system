import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { AccountStatusEnum } from '@/domain/enums/account-status.enum';

export class UpdateStatusAccountDto {
  @IsEnum(AccountStatusEnum)
  @ApiProperty({
    description: 'Status of the account',
    example: AccountStatusEnum.ACTIVE,
    required: true,
  })
  @Expose()
  status: AccountStatusEnum;
}
