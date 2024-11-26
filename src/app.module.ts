import { Module } from '@nestjs/common';
import { ClientModule } from './presentation/controllers/clients/client.module';

@Module({
  imports: [ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
