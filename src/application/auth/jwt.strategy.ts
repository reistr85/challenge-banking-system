import { ClientRepository } from '@/infrastructure/repositories/sequelize/client.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { ClientModel } from '@/infrastructure/database/sequelize/models/client.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JwtStrategy') {
  constructor(
    private jwtService: JwtService,
    @InjectModel(ClientModel) private clientModel: typeof ClientModel,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.cpf };
  }

  async authenticate(req) {
    const token = req.headers.authorization;
    if (!token) {
      return this.fail('Unauthorized', 401);
    }
  }
}
