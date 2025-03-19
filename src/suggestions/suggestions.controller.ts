import { Body, Controller, Param, Post } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { AddSuggestionDto } from './dto/addSuggestion.dto';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private suggestionsService: SuggestionsService) {}

  /**
   * Add a suggestion for a single product per user.
   * @param userId - User ID
   * @param productId - Product ID
   * @param interactionType - @enum InteractionEnum
   */
  @Post(':userId/suggestions')
  addUserSuggestion(
    @Param('userId') userId: string,
    @Body() AddSuggestionDto: AddSuggestionDto,
  ) {
    const { productId, interactionType } = AddSuggestionDto;
    if (!productId || !interactionType || !userId) {
      throw new Error('Missing required fields');
    }
    return this.suggestionsService.addUserSuggestion(
      parseInt(userId),
      productId,
      interactionType,
    );
  }
}
