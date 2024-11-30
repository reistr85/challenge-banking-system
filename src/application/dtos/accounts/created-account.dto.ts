import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';
import { Expose, plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsUUID } from 'class-validator';
import { AccountStatusEnum } from '@/domain/enums/account-status.enum';

export class CreatedAccountDto extends PickType(CreateAccountDto, [
  'clientId',
]) {
  @IsUUID()
  @ApiProperty({
    description: 'Id of the account',
    example: '3fa1d6bc-9b91-4b97-bacf-c5880b9b0420',
    required: true,
  })
  @Expose()
  id: string;

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

  static toDto(data): CreatedAccountDto {
    return plainToInstance(CreatedAccountDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
