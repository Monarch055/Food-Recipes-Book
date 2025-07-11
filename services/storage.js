import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = '@recipe_bookmarks';

export const storageService = {
  // Get all bookmarked recipes
  getBookmarks: async () => {
    try {
      const bookmarksJson = await AsyncStorage.getItem(BOOKMARKS_KEY);
      return bookmarksJson ? JSON.parse(bookmarksJson) : [];
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      return [];
    }
  },

  // Add recipe to bookmarks
  addBookmark: async (recipe) => {
    try {
      const bookmarks = await storageService.getBookmarks();
      const existingIndex = bookmarks.findIndex(bookmark => bookmark.idMeal === recipe.idMeal);
      
      if (existingIndex === -1) {
        bookmarks.push(recipe);
        await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
        return true;
      }
      return false; // Already bookmarked
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw new Error('Failed to add bookmark');
    }
  },

  // Remove recipe from bookmarks
  removeBookmark: async (recipeId) => {
    try {
      const bookmarks = await storageService.getBookmarks();
      const filteredBookmarks = bookmarks.filter(bookmark => bookmark.idMeal !== recipeId);
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filteredBookmarks));
      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw new Error('Failed to remove bookmark');
    }
  },

  // Check if recipe is bookmarked
  isBookmarked: async (recipeId) => {
    try {
      const bookmarks = await storageService.getBookmarks();
      return bookmarks.some(bookmark => bookmark.idMeal === recipeId);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  },

  // Clear all bookmarks
  clearBookmarks: async () => {
    try {
      await AsyncStorage.removeItem(BOOKMARKS_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
      throw new Error('Failed to clear bookmarks');
    }
  }
}; 