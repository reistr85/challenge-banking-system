import { IClientRepository } from '@/domain/repositories/iclient.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

    const payload = { cpf: client.cpf, sub: client.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
