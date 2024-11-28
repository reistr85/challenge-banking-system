import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedAccountDto } from 'src/application/dtos/accounts/created-account.dto';
import { DepositTransactionDto } from 'src/application/dtos/transactions/deposit-transaction.dto';
import { DepositTransactionUseCase } from 'src/application/use-cases/transactions/deposit-transaction.usecase';

@Controller('transactions')
@ApiTags('Transactions')
export class DepositTransactionController {
  constructor(private readonly useCase: DepositTransactionUseCase) {}

  @Post('deposit')
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
    @Body() depositTransactionDto: DepositTransactionDto,
  ): Promise<void> {
    await this.useCase.execute(depositTransactionDto);
  }
}
