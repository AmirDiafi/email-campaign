import { InteractionEnum, User, UserSuggestion } from '@prisma/client';

type UserWithProds = User & {
  suggestions: {
    product: {
      id: number;
      name: string;
      description: string | null;
      price: number;
      image_url: string | null;
    };
    id: number;
    createdAt: Date;
    user_id: number;
    product_id: number;
    interactType: InteractionEnum;
  }[];
};

// Weights for each interaction type
const interactionWeights = {
  [InteractionEnum.LIKE]: 5,
  [InteractionEnum.SAVE]: 4,
  [InteractionEnum.SHARE]: 3,
  [InteractionEnum.COMMENT]: 2,
  [InteractionEnum.VIEW]: 1,
};

/**
 * Function to process user data and return the user with sorted products based on interaction weights.
 * @param user - User object containing suggestions (interactions with products)
 * @returns User object with sorted products based on interaction weights in descending order
 */
export function getUserWithSortedProducts(user: UserWithProds) {
  // Calculate total weight for each product based on user interactions
  const sortedSuggestions = suggestionProductsSortedByWeight(user.suggestions);
  const sortedProducts = user.suggestions.filter((suggestion) =>
    sortedSuggestions.some((product) => product.id === suggestion.product_id),
  );
  // Return the user object with sorted products
  return {
    ...user,
    suggestions: sortedProducts,
  };
}

export function suggestionProductsSortedByWeight(
  suggestions: UserSuggestion[],
) {
  // Sort products by their total weight in descending order
  const productWeights: Record<number, number> = {};

  // Calculate total weight for each product based on user interactions
  suggestions.forEach(({ product_id, interactType }) => {
    const productId = product_id;
    const interactionType = interactType;

    // Get the weight for the current interaction
    const weight = interactionWeights[interactionType];

    // Add weight to the product's total weight
    if (!productWeights[productId]) {
      productWeights[productId] = 0;
    }
    productWeights[productId] += weight;
  });

  const sortedSuggestions = suggestions
    .map((product) => product)
    .filter(
      (value, index, self) =>
        self.findIndex((product) => product.id === value.id) === index, // Remove duplicate products
    )
    .sort((a, b) => {
      const weightA = productWeights[a.id] || 0;
      const weightB = productWeights[b.id] || 0;
      return weightB - weightA; // Sort by weight in descending order
    });

  return sortedSuggestions;
}
