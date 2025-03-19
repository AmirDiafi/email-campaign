/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNotEmpty,
  ValidateIf,
  IsDateString,
  IsISO8601,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ValidateIf((o) => typeof o.birthdate === 'string')
  @IsDateString()
  @ValidateIf((o) => o.birthdate instanceof Date)
  @IsISO8601()
  birthdate: Date | string;
}
