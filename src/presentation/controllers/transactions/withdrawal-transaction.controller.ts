import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WithdrawalTransactionDto } from 'src/application/dtos/transactions/withdrawal-transaction.dto';
import { WithdrawnTransactionDto } from 'src/application/dtos/transactions/withdrawan-transaction.dto';
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
    status: HttpStatus.OK,
    description: 'Successfully created',
    type: WithdrawnTransactionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error in the data sent.',
  })
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() withdrawalTransactionDto: WithdrawalTransactionDto,
  ): Promise<WithdrawnTransactionDto> {
    return await this.useCase.execute(withdrawalTransactionDto);
  }
}
