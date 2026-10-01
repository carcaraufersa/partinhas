import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto) {
  constructor(private readonly prisma: PrismaService) {}

  async signIn(dto: SignInDto) {
    // Busca o usuário pelo email no banco de dados
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Tratamento de credenciais inválidas — email não encontrado
    // Se não encontrar o usuário, lança erro 401
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);

    // Tratamento de credenciais inválidas — senha incorreta
    // Compara a senha digitada com o hash salvo no banco
    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);

    // Se a senha estiver errada, lança erro 401
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Monta o payload do token com informações do usuário
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Gera e retorna o token JWT
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
    return user;
  }
}
