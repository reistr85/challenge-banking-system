import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedAccountDto } from '@/application/dtos/accounts/created-account.dto';
import { UpdateStatusAccountDto } from '@/application/dtos/accounts/update-status-account.dto';
import { UpdateStatusAccountUseCase } from '@/application/use-cases/accounts/update-status-account.usecase';

@Controller('accounts')
@ApiTags('Accounts')
export class UpdateStatusAccountController {
  constructor(private readonly useCase: UpdateStatusAccountUseCase) {}

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Account',
    description: 'Update status a account in the system.',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successfully updated',
    type: CreatedAccountDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error in the data sent.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusAccountDto: UpdateStatusAccountDto,
  ): Promise<void> {
    await this.useCase.execute(id, updateStatusAccountDto);
  }
}
