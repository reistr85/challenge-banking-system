import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';
import { Expose, plainToInstance } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class CreatedAccountDto extends PickType(CreateAccountDto, [
  'number',
  'balance',
  'status',
]) {
  @IsUUID()
  @ApiProperty({
    description: 'Id of the account',
    example: '3fa1d6bc-9b91-4b97-bacf-c5880b9b0420',
    required: true,
  })
  @Expose()
  id: string;

  static toDto(data): CreatedAccountDto {
    return plainToInstance(CreatedAccountDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
