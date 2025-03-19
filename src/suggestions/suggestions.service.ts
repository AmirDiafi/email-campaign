import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InteractionEnum } from '@prisma/client';

@Injectable()
export class SuggestionsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Add a suggestion for a single product per user.
   * @param userId - User ID
   * @param productId - Product ID
   * @Param interactionType - @enum InteractionEnum
   */
  async addUserSuggestion(
    userId: number,
    productId: number,
    interactionType: InteractionEnum,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Add new suggestion if it doesn't exist
    const existingSuggestion = await this.prisma.userSuggestion.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (!existingSuggestion) {
      await this.prisma.userSuggestion.create({
        data: {
          user_id: userId,
          product_id: productId,
          interactType: interactionType,
        },
      });
    }

    return {
      message: 'Suggestion added successfully',
      userId,
      productId,
    };
  }
}
