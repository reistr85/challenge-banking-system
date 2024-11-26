import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';
import { Expose, plainToInstance } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class CreatedClientDto extends PickType(CreateClientDto, [
  'name',
  'cpf',
  'phone',
]) {
  @IsUUID()
  @ApiProperty({
    description: 'Id of the client',
    example: '3fa1d6bc-9b91-4b97-bacf-c5880b9b0420',
    required: true,
  })
  @Expose()
  id: string;

  static toDto(data): CreatedClientDto {
    return plainToInstance(CreatedClientDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
