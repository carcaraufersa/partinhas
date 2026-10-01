import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

// Mock completo do bcrypt — evita problema de propriedades não redefináveis
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

import * as bcrypt from 'bcrypt';

const mockUser = {
  id: 'uuid-123',
  name: 'Andeson',
  email: 'andeson@email.com',
  passwordHash: 'hash-da-senha',
  telephone: null,
  role: 'USER' as const,
  createdAt: new Date(),
};

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
  },
};

const mockJwtService = {
  signAsync: jest.fn().mockResolvedValue('token-jwt-fake'),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('deve retornar access_token quando credenciais são válidas', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.signIn({
        email: 'andeson@email.com',
        password: '12345678',
      });

      expect(result).toEqual({ access_token: 'token-jwt-fake' });
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'andeson@email.com' },
      });
    });

    it('deve lançar UnauthorizedException quando email não for encontrado', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.signIn({
          email: 'naoexiste@email.com',
          password: '12345678',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException quando senha estiver incorreta', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.signIn({
          email: 'andeson@email.com',
          password: 'senha-errada',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
