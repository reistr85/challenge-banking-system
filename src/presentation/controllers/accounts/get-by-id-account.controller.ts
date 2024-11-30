import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetByIdAccountDto } from '@/application/dtos/accounts/get-by-id-account.dto';
import { GetByIdAccountUseCase } from '@/application/use-cases/accounts/get-by-id-account.usecase';

@Controller('accounts')
@ApiTags('Accounts')
export class GetByIdAccountController {
  constructor(private readonly useCase: GetByIdAccountUseCase) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get by id Account',
    description: 'Get by id account in the system.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully',
    type: GetByIdAccountDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error in the data sent.',
  })
  handle(@Param('id', ParseUUIDPipe) id: string): Promise<GetByIdAccountDto> {
    return this.useCase.execute(id);
  }
}
