// userId: number,
// productId: number,
// interactionType: InteractionEnum,

import { InteractionEnum } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddSuggestionDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;
  @IsNotEmpty()
  interactionType: InteractionEnum;
}
