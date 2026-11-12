import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(userId: string, dto: UpdateUserProfileDto) {
    const data = {
      ...(dto.name !== undefined && { name: dto.name.trim() }),
      ...(dto.email !== undefined && { email: dto.email }),
      ...(dto.telephone !== undefined && { telephone: dto.telephone }),
    };
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Informe ao menos um campo do perfil.');
    }
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data,
        select: { id: true, name: true, email: true, telephone: true },
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        telephone: user.telephone,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ConflictException('E-mail já cadastrado.');
        if (error.code === 'P2025')
          throw new NotFoundException('Usuário não encontrado.');
      }
      throw error;
    }
  }

  async create(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash,
        telephone: dto.telephone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        role: true,
        createdAt: true,
      },
    });
  }
}
