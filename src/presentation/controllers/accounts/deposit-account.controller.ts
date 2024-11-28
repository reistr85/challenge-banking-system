import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedAccountDto } from 'src/application/dtos/accounts/created-account.dto';
import { DepositAccountDto } from 'src/application/dtos/accounts/deposit-account.dto';
import { DepositAccountUseCase } from 'src/application/use-cases/accounts/deposit-account.usecase';

@Controller('accounts')
@ApiTags('Accounts')
export class DepositAccountController {
  constructor(private readonly useCase: DepositAccountUseCase) {}

  @Post(':id/deposit')
  @ApiOperation({
    summary: 'Deposit',
    description: 'Deposit in an account.',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully created',
    type: CreatedAccountDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error in the data sent.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() depositAccountDto: DepositAccountDto,
  ): Promise<void> {
    await this.useCase.execute(id, depositAccountDto);
  }
}
