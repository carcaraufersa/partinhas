import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
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
  @IsNotEmpty()
  @Length(2, 60, { message: 'O nome deve ter entre 2 e 60 caracteres.' })
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  password!: string;

  @IsOptional()
  @IsString()
  telephone?: string;
}
