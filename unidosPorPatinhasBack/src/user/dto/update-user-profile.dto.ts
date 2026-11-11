import { IsEmail, IsString, Matches, ValidateIf } from 'class-validator';

export class UpdateUserProfileDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @Matches(/\S/, { message: 'name não pode estar vazio.' })
  name?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsEmail()
  email?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @Matches(/^\+?[\d\s().-]{8,25}$/, { message: 'telephone inválido.' })
  telephone?: string;
}
