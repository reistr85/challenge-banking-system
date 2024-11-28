import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedAccountDto } from 'src/application/dtos/accounts/created-account.dto';
import { TransferTransactionDto } from 'src/application/dtos/transactions/transfer-transaction.dto';
import { TransferTransactionUseCase } from 'src/application/use-cases/transactions/transfer-transaction.usecase';

@Controller('transactions')
@ApiTags('Transactions')
export class TransferTransactionController {
  constructor(private readonly useCase: TransferTransactionUseCase) {}

  @Post('transfer')
  @ApiOperation({
    summary: 'Transfer',
    description: 'Transfer in an account.',
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
    @Body() transferTransactionDto: TransferTransactionDto,
  ): Promise<void> {
    await this.useCase.execute(transferTransactionDto);
  }
}
