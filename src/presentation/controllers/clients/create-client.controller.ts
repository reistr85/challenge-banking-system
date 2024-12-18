import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from '@/application/dtos/clients/create-client.dto';
import { CreatedClientDto } from '@/application/dtos/clients/created-client.dto';
import { CreateClientUseCase } from '@/application/use-cases/clients/create-client.usecase';
import { Public } from '@/application/auth/public';

@Controller('clients')
@ApiTags('Clients')
export class CreateClientController {
  constructor(private readonly useCase: CreateClientUseCase) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Create Client',
    description: 'Create a new client in the system.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created',
    type: CreatedClientDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error in the data sent.',
  })
  handle(@Body() createClientDto: CreateClientDto): Promise<CreatedClientDto> {
    return this.useCase.execute(createClientDto);
  }
}
