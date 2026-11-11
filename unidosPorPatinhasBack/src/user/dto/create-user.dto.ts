import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  // O @Transform roda antes da validação: o limite vale para o nome já sem espaços
  // nas pontas, igual ao app (NAME_MIN_LENGTH / NAME_MAX_LENGTH).
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(2, 60, { message: 'O nome deve ter entre 2 e 60 caracteres.' })
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsString()
  telephone?: string;
}
