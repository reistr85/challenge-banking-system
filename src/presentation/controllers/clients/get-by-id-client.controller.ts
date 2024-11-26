import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetByIdClientDto } from 'src/application/dtos/clients/get-by-id-client.dto';
import { GetByIdClientUseCase } from 'src/application/use-cases/clients/get-by-id-client.usecase';

@Controller('clients')
@ApiTags('Clients')
export class GetByIdClientController {
  constructor(private readonly useCase: GetByIdClientUseCase) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get by id Client',
    description: 'Get by id client in the system.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully',
    type: GetByIdClientDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error in the data sent.',
  })
  handle(@Param('id', ParseUUIDPipe) id: string): Promise<GetByIdClientDto> {
    return this.useCase.execute(id);
  }
}
