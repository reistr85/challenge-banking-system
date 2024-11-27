import { PickType } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CreatedAccountDto } from './created-account.dto';

export class GetByIdAccountDto extends PickType(CreatedAccountDto, [
  'id',
  'number',
  'balance',
  'status',
]) {
  static toDto(data): GetByIdAccountDto {
    return plainToInstance(GetByIdAccountDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
