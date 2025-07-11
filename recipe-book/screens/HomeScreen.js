import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { recipeService } from '../services/api';
import { storageService } from '../services/storage';

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [randomRecipes, bookmarks] = await Promise.all([
        recipeService.getRandomRecipes(15),
        storageService.getBookmarks(),
      ]);
      
      // Add unique identifiers to prevent duplicate keys
      const recipesWithKeys = randomRecipes.map((recipe, index) => ({
        ...recipe,
        uniqueKey: `${recipe.idMeal}-${Date.now()}-${index}`
      }));
      
      setRecipes(recipesWithKeys);
      setBookmarkedRecipes(new Set(bookmarks.map(recipe => recipe.idMeal)));
      setIsSearchMode(false);
      setSearchQuery('');
    } catch (error) {
      Alert.alert('Error', 'Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      await loadInitialData();
      return;
    }

    try {
      setLoading(true);
      setSearchQuery(query);
      const searchResults = await recipeService.searchRecipes(query);
      
      // Add unique identifiers to prevent duplicate keys
      const recipesWithKeys = searchResults.map((recipe, index) => ({
        ...recipe,
        uniqueKey: `${recipe.idMeal}-${Date.now()}-${index}`
      }));
      
      setRecipes(recipesWithKeys);
      setIsSearchMode(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to search recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSearch = async () => {
    await loadInitialData();
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipeId: recipe.idMeal });
  };

  const handleBookmarkPress = async (recipe) => {
    try {
      const isBookmarked = bookmarkedRecipes.has(recipe.idMeal);
      
      if (isBookmarked) {
        await storageService.removeBookmark(recipe.idMeal);
        setBookmarkedRecipes(prev => {
          const newSet = new Set(prev);
          newSet.delete(recipe.idMeal);
          return newSet;
        });
      } else {
        await storageService.addBookmark(recipe);
        setBookmarkedRecipes(prev => new Set([...prev, recipe.idMeal]));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update bookmark. Please try again.');
    }
  };

  const renderRecipe = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={handleRecipePress}
      onBookmarkPress={handleBookmarkPress}
      isBookmarked={bookmarkedRecipes.has(item.idMeal)}
    />
  );

  if (loading) {
    return <LoadingSpinner message="Loading delicious recipes..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="restaurant" size={32} color="#FF6B6B" />
          <Text style={styles.title}>Recipe Book</Text>
        </View>
        <Text style={styles.subtitle}>Discover amazing recipes</Text>
      </View>

      <SearchBar onSearch={handleSearch} onReset={handleResetSearch} />

      {/* Search Results Header */}
      {isSearchMode && searchQuery && (
        <View style={styles.searchResultsHeader}>
          <View style={styles.searchInfo}>
            <Text style={styles.searchResultsText}>
              {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
            </Text>
            <Text style={styles.searchQueryText}>
              for "{searchQuery}"
            </Text>
          </View>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetSearch}
          >
            <Ionicons name="refresh" size={16} color="#FF6B6B" />
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item, index) => `${item.idMeal}-${Date.now()}-${index}`}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {isSearchMode ? (
              <>
                <Ionicons name="search-outline" size={64} color="#BDC3C7" />
                <Text style={styles.emptyText}>No recipes found</Text>
                <Text style={styles.emptySubtext}>
                  Try searching for something else or reset your search
                </Text>
                <TouchableOpacity
                  style={styles.resetSearchButton}
                  onPress={handleResetSearch}
                >
                  <Text style={styles.resetSearchButtonText}>Reset Search</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Ionicons name="restaurant-outline" size={64} color="#BDC3C7" />
                <Text style={styles.emptyText}>No recipes available</Text>
                <Text style={styles.emptySubtext}>Pull to refresh to try again</Text>
              </>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginLeft: 44,
  },
  searchResultsHeader: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  searchInfo: {
    flex: 1,
  },
  searchResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  searchQueryText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF2F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resetButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 4,
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7F8C8D',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BDC3C7',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  resetSearchButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetSearchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen; 