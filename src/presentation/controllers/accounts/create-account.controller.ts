import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from '@/application/dtos/accounts/create-account.dto';
import { CreatedAccountDto } from '@/application/dtos/accounts/created-account.dto';
import { CreateAccountUseCase } from '@/application/use-cases/accounts/create-account.usecase';

@Controller('accounts')
@ApiTags('Accounts')
export class CreateAccountController {
  constructor(private readonly useCase: CreateAccountUseCase) {}

  @Post()
  @ApiOperation({
    summary: 'Create Account',
    description: 'Create a new account in the system.',
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
  handle(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<CreatedAccountDto> {
    return this.useCase.execute(createAccountDto);
  }
}
