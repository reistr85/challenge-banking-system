import { PickType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';
import { plainToInstance } from 'class-transformer';

export class CreatedClientDto extends PickType(CreateClientDto, [
  'name',
  'cpf',
  'phone',
]) {
  static toDto(data): CreatedClientDto {
    return plainToInstance(CreatedClientDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
