import { IClientRepository } from '@/domain/repositories/iclient.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientsRepository: IClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ cpf, password }: { cpf: string; password: string }) {
    const client = await this.clientsRepository.findByCpf(cpf);
    if (!client) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const options: JwtSignOptions = {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '1h',
    };

    const payload = { cpf: client.cpf, sub: { id: client.id } };
    return {
      access_token: await this.jwtService.sign(payload, options),
    };
  }
}
