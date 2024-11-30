import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DepositTransactionDto } from '@/application/dtos/transactions/deposit-transaction.dto';
import { DepositedTransactionDto } from '@/application/dtos/transactions/deposited-transaction.dto';
import { DepositTransactionUseCase } from '@/application/use-cases/transactions/deposit-transaction.usecase';

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
    status: HttpStatus.OK,
    description: 'Successfully created',
    type: DepositedTransactionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error in the data sent.',
  })
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() depositTransactionDto: DepositTransactionDto,
  ): Promise<DepositedTransactionDto> {
    return await this.useCase.execute(depositTransactionDto);
  }
}
