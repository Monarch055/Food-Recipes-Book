import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { truncateText, getRecipeCategory } from '../utils/helpers';

const { width } = Dimensions.get('window');

const RecipeCard = ({ recipe, onPress, onBookmarkPress, isBookmarked = false }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(recipe)}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => onBookmarkPress(recipe)}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? '#FF6B6B' : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.strMeal}
        </Text>
        <Text style={styles.category}>
          {getRecipeCategory(recipe)}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {truncateText(recipe.strInstructions, 80)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    color: '#34495E',
    lineHeight: 20,
  },
});

export default RecipeCard; 