import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signIn(dto: SignInDto) {
    // Busca o usuário pelo email no banco de dados
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Se não encontrar o usuário, lança erro 401
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Compara a senha digitada com o hash salvo no banco
    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);

    // Se a senha estiver errada, lança erro 401
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return user;
  }
}