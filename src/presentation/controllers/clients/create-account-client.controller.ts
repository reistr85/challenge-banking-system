import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedAccountDto } from 'src/application/dtos/accounts/created-account.dto';
import { CreateAccountClientUseCase } from 'src/application/use-cases/clients/create-account-client.usecase';

@Controller('clients')
@ApiTags('Clients')
export class CreateAccountClientController {
  constructor(private readonly useCase: CreateAccountClientUseCase) {}

  @Post(':id/accounts')
  @ApiOperation({
    summary: 'Create Account',
    description: 'Create a new account client in the system.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created',
    type: CreatedAccountDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error in the data sent.',
  })
  handle(@Param('id', ParseUUIDPipe) id: string): Promise<CreatedAccountDto> {
    return this.useCase.execute(id);
  }
}
