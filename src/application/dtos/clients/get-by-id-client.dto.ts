import { PickType } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CreatedClientDto } from './created-client.dto';

export class GetByIdClientDto extends PickType(CreatedClientDto, [
  'id',
  'name',
  'cpf',
  'phone',
]) {
  static toDto(data): GetByIdClientDto {
    return plainToInstance(GetByIdClientDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
