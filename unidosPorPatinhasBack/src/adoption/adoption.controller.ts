import { Body, Controller, Post } from '@nestjs/common';

import { AdoptionService } from './adoption.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';

@Controller('adoptions')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post()
  create(@Body() body: CreateAdoptionDto) {
    return this.adoptionService.create(body.userId, body.animalId);
  }
}