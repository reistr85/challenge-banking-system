import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ClientRepository } from '@/infrastructure/repositories/sequelize/client.repository';
import { InjectModel } from '@nestjs/sequelize';
import { ClientModel } from '@/infrastructure/database/sequelize/models/client.model';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    @InjectModel(ClientModel) private clientModel: typeof ClientModel,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(token);
    if (!token) {
      throw new UnauthorizedException('AuthErrorMessages.TokenNotProvided');
    }

    try {
      console.log(token);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'your_secret_key_here',
      });
      console.log(payload);
      const client = await this.clientModel.findOne({
        where: { cpf: payload.cpf },
      });

      if (!client) {
        throw new UnauthorizedException();
      }
      request['client'] = { payload };
    } catch (error) {
      throw new UnauthorizedException('AuthErrorMessages.AuthenticationFailed');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
