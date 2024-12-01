import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async handle(@Body() { cpf, password }: { cpf: string; password: string }) {
    return this.authService.execute({ cpf, password });
  }
}
