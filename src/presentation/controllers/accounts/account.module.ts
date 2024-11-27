import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModel } from 'src/infrastructure/database/sequelize/models/account.model';
import { AccountRepository } from 'src/infrastructure/repositories/sequelize/account.repository';
import { GetByIdAccountController } from './get-by-id-account.controller';
import { GetByIdAccountUseCase } from 'src/application/use-cases/accounts/get-by-id-account.usecase';

@Module({
  imports: [SequelizeModule.forFeature([AccountModel])],
  controllers: [GetByIdAccountController],
  providers: [AccountRepository, GetByIdAccountUseCase],
  exports: [AccountRepository],
})
export class AccountModule {}
