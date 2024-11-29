import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsDateString, IsString, Length } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class CreateClientDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the client',
    example: 'Jhon Doe',
    required: true,
  })
  @Expose()
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Phone of the client',
    example: '84988481919',
    required: true,
  })
  @Expose()
  @Length(11, 11)
  phone: string;

  @IsString()
  @IsCPF()
  @ApiProperty({
    description: 'Cpf of the client',
    example: '02665505428',
    required: true,
  })
  @Expose()
  @Length(11, 11)
  cpf: string;

  @IsDateString()
  @ApiProperty({
    description: 'Birth of the client',
    example: '1995-12-12',
    required: true,
  })
  @Expose()
  birth: string;
}
