import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const recipeService = {
  // Search recipes by name
  searchRecipes: async (query) => {
    try {
      const response = await api.get(`search.php?s=${encodeURIComponent(query)}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw new Error('Failed to search recipes');
    }
  },

  // Get recipe by ID
  getRecipeById: async (id) => {
    try {
      const response = await api.get(`lookup.php?i=${id}`);
      return response.data.meals?.[0] || null;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw new Error('Failed to fetch recipe details');
    }
  },

  // Get recipes by category
  getRecipesByCategory: async (category) => {
    try {
      const response = await api.get(`filter.php?c=${encodeURIComponent(category)}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      throw new Error('Failed to fetch recipes by category');
    }
  },

  // Get random recipes (for home screen)
  getRandomRecipes: async (count = 10) => {
    try {
      const promises = Array.from({ length: count }, () => 
        api.get('random.php')
      );
      const responses = await Promise.all(promises);
      return responses.map(response => response.data.meals?.[0]).filter(Boolean);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      throw new Error('Failed to fetch random recipes');
    }
  }
}; 