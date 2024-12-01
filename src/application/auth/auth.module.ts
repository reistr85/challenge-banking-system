import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ClientModule } from '@/presentation/controllers/clients/client.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModel } from '@/infrastructure/database/sequelize/models/client.model';
import { ClientRepository } from '@/infrastructure/repositories/sequelize/client.repository';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([ClientModel]),
    JwtModule.register({}),
    ClientModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthService,
    JwtStrategy,
    JwtService,
    JwtAuthGuard,
  ],
  controllers: [AuthController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
