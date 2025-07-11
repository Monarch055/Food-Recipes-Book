import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import LoadingSpinner from '../components/LoadingSpinner';
import { recipeService } from '../services/api';
import { storageService } from '../services/storage';
import { extractIngredients, formatInstructions, getRecipeCategory, getRecipeCuisine } from '../utils/helpers';

const { width } = Dimensions.get('window');

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    loadRecipeDetails();
  }, [recipeId]);

  const loadRecipeDetails = async () => {
    try {
      setLoading(true);
      const [recipeData, bookmarkStatus] = await Promise.all([
        recipeService.getRecipeById(recipeId),
        storageService.isBookmarked(recipeId),
      ]);
      
      setRecipe(recipeData);
      setIsBookmarked(bookmarkStatus);
    } catch (error) {
      Alert.alert('Error', 'Failed to load recipe details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        await storageService.removeBookmark(recipeId);
        setIsBookmarked(false);
      } else {
        await storageService.addBookmark(recipe);
        setIsBookmarked(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update bookmark. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading recipe details..." />;
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#E74C3C" />
          <Text style={styles.errorText}>Recipe not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const ingredients = extractIngredients(recipe);
  const instructions = formatInstructions(recipe.strInstructions);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.strMealThumb }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={handleBookmarkToggle}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={isBookmarked ? '#FF6B6B' : '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>

        {/* Recipe Info */}
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.strMeal}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="restaurant-outline" size={16} color="#7F8C8D" />
              <Text style={styles.metaText}>{getRecipeCategory(recipe)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="globe-outline" size={16} color="#7F8C8D" />
              <Text style={styles.metaText}>{getRecipeCuisine(recipe)}</Text>
            </View>
          </View>

          {/* Ingredients Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>
                  <Text style={styles.measureText}>{item.measure}</Text> {item.ingredient}
                </Text>
              </View>
            ))}
          </View>

          {/* Instructions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {instructions.map((instruction) => (
              <View key={instruction.id} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{instruction.id}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction.step}</Text>
              </View>
            ))}
          </View>

          {/* Video Link */}
          {recipe.strYoutube && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Video Tutorial</Text>
              <TouchableOpacity style={styles.videoButton}>
                <Ionicons name="play-circle-outline" size={24} color="#FF6B6B" />
                <Text style={styles.videoButtonText}>Watch on YouTube</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  metaText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 6,
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ingredientBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B6B',
    marginTop: 8,
    marginRight: 12,
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
  },
  measureText: {
    fontWeight: '600',
    color: '#FF6B6B',
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  instructionNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  videoButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#7F8C8D',
    marginTop: 16,
  },
});

export default RecipeDetailScreen; 