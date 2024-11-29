import { Module } from '@nestjs/common';
import { ClientModule } from './presentation/controllers/clients/client.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientModel } from './infrastructure/database/sequelize/models/client.model';
import { AccountModule } from './presentation/controllers/accounts/account.module';
import { AccountModel } from './infrastructure/database/sequelize/models/account.model';
import { TransactionModule } from './presentation/controllers/transactions/transaction.module';
import { TransactionModel } from './infrastructure/database/sequelize/models/transaction.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres', // Ou 'mysql'
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([ClientModel, AccountModel, TransactionModel]),
    ClientModule,
    AccountModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
