/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsDate, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  birthdate: Date;

  @IsNotEmpty()
  @IsString()
  password: string;
}
