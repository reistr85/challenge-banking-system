import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedAccountDto } from 'src/application/dtos/accounts/created-account.dto';
import { WithdrawalTransactionDto } from 'src/application/dtos/transactions/withdrawal-transaction.dto';
import { WithdrawalTransactionUseCase } from 'src/application/use-cases/transactions/withdrawal-transaction.usecase';

@Controller('transactions')
@ApiTags('Transactions')
export class WithdrawalTransactionController {
  constructor(private readonly useCase: WithdrawalTransactionUseCase) {}

  @Post('withdrawal')
  @ApiOperation({
    summary: 'Withdrawal',
    description: 'Withdrawal in an account.',
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
    @Body() withdrawalTransactionDto: WithdrawalTransactionDto,
  ): Promise<void> {
    await this.useCase.execute(withdrawalTransactionDto);
  }
}
