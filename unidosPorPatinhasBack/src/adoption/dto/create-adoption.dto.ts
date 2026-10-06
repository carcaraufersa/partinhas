import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdoptionDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  animalId!: string;
}