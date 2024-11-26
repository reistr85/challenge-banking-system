import { Module } from '@nestjs/common';
import { ClientModule } from './presentation/controllers/clients/client.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientModel } from './infrastructure/database/sequelize/models/client.model';

console.log(process.env.DB_USER);

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
    SequelizeModule.forFeature([ClientModel]),
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
