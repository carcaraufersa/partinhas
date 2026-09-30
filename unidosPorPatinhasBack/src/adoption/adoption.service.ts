import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdoptionService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, animalId: string) {
    return this.prisma.adoption.create({
      data: {
        userId,
        animalId,
      },
    });
  }
}