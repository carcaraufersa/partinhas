import { Body, Controller, Post } from '@nestjs/common';

import { AdoptionService } from './adoption.service';

@Controller('adoptions')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post()
  create(@Body() body: { userId: string; animalId: string }) {
    return this.adoptionService.create(body.userId, body.animalId);
  }
}