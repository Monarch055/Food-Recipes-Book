// Extract ingredients and measurements from recipe object
export const extractIngredients = (recipe) => {
  const ingredients = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }
  
  return ingredients;
};

// Format recipe instructions
export const formatInstructions = (instructions) => {
  if (!instructions) return [];
  
  return instructions
    .split('.')
    .map(step => step.trim())
    .filter(step => step.length > 0)
    .map((step, index) => ({
      id: index + 1,
      step: step.endsWith('.') ? step : step + '.'
    }));
};

// Truncate text to specified length
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Format cooking time (placeholder - API doesn't provide this)
export const formatCookingTime = (time) => {
  if (!time) return 'N/A';
  return `${time} mins`;
};

// Get category from recipe
export const getRecipeCategory = (recipe) => {
  return recipe.strCategory || 'Uncategorized';
};

// Get cuisine from recipe
export const getRecipeCuisine = (recipe) => {
  return recipe.strArea || 'International';
}; 