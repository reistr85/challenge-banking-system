import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransferTransactionDto } from '@/application/dtos/transactions/transfer-transaction.dto';
import { TransferredTransactionDto } from '@/application/dtos/transactions/transferred-transaction.dto';
import { TransferTransactionUseCase } from '@/application/use-cases/transactions/transfer-transaction.usecase';

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
    status: HttpStatus.OK,
    description: 'Successfully created',
    type: TransferredTransactionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error in the data sent.',
  })
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() transferTransactionDto: TransferTransactionDto,
  ): Promise<TransferredTransactionDto> {
    return await this.useCase.execute(transferTransactionDto);
  }
}
