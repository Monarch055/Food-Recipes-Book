# Recipe Book 📱

A beautiful and feature-rich mobile recipe app built with React Native and Expo. Discover, search, and save your favorite recipes from TheMealDB API.

![Recipe Book App](https://img.shields.io/badge/React%20Native-0.72.6-blue)
![Expo](https://img.shields.io/badge/Expo-49.0.15-black)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey)

## ✨ Features

### 🍳 Recipe Explorer
- **Browse Recipes**: Discover random recipes on the home screen
- **Search Functionality**: Search recipes by name with real-time results
- **Recipe Details**: View complete recipe information including ingredients and instructions
- **Search Results Counter**: See how many recipes match your search

### 🔖 Bookmarking System
- **Save Favorites**: Bookmark recipes for later viewing
- **Persistent Storage**: Bookmarks saved locally using AsyncStorage
- **Bookmark Management**: View all saved recipes in a dedicated tab
- **Quick Actions**: Add/remove bookmarks with a single tap

### 🎨 Modern UI/UX
- **Beautiful Design**: Clean, modern interface with smooth animations
- **Responsive Layout**: Optimized for different screen sizes
- **Intuitive Navigation**: Bottom tab navigation with stack navigation
- **Loading States**: Proper loading indicators and error handling

### 🔧 Technical Features
- **Cross-Platform**: Works on iOS, Android, and Web
- **Offline Support**: Bookmarks persist even without internet
- **Performance Optimized**: Efficient list rendering and state management
- **Error Handling**: Graceful error handling with user-friendly messages

## 📱 Screenshots

![WhatsApp Image 2025-07-11 at 11 31 21_6d789439](https://github.com/user-attachments/assets/234df976-6b97-4d06-a55d-e489f9e27e24)
![WhatsApp Image 2025-07-11 at 11 31 21_ad78dd04](https://github.com/user-attachments/assets/dcaebfab-79a4-4d03-980f-19b07cc9966e)
![WhatsApp Image 2025-07-11 at 11 31 21_74eb2209](https://github.com/user-attachments/assets/936e8660-bb28-467e-ae7d-c776f1cec2e1)

## 🛠️ Tech Stack

- **Framework**: React Native 0.72.6
- **Build Tool**: Expo 49.0.15
- **Navigation**: React Navigation 6
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons
- **API**: TheMealDB

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Monarch055/Food-Recipes-Book.git
   cd recipe-book
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Install the [Expo Go](https://expo.dev/client) app on your phone
   - Scan the QR code displayed in the terminal
   - Or press `i` for iOS simulator or `a` for Android emulator

## 📖 Usage

### Home Screen
- Browse featured recipes on the home screen
- Use the search bar to find specific recipes
- Tap on any recipe card to view details
- Use the bookmark button to save recipes

### Search Functionality
- Type in the search bar to find recipes
- View search results count in the header
- Use the reset button to return to featured recipes
- Clear search with the X button in the search bar

### Recipe Details
- View complete recipe information
- See ingredients with measurements
- Follow step-by-step instructions
- Bookmark/unbookmark the recipe
- Navigate back to the previous screen

### Bookmarks
- Access saved recipes in the Bookmarks tab
- Remove individual bookmarks
- Clear all bookmarks at once
- Navigate to recipe details from bookmarks

## 🏗️ Project Structure

```
recipe-book/
├── components/          # Reusable UI components
│   ├── RecipeCard.js    # Recipe card component
│   ├── SearchBar.js     # Search input component
│   └── LoadingSpinner.js # Loading indicator
├── screens/             # App screens
│   ├── HomeScreen.js    # Main home screen
│   ├── RecipeDetailScreen.js # Recipe details
│   └── BookmarkScreen.js # Bookmarks screen
├── navigation/          # Navigation setup
│   └── AppNavigator.js  # Main navigation
├── services/            # API and storage services
│   ├── api.js          # TheMealDB API service
│   └── storage.js      # AsyncStorage service
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions
├── assets/             # Static assets
├── App.js              # Main app component
├── app.json            # Expo configuration
└── package.json        # Dependencies
```

## 🔌 API Integration

This app uses [TheMealDB](https://www.themealdb.com/) API for recipe data:

- **Base URL**: `https://www.themealdb.com/api/json/v1/1/`
- **Endpoints**:
  - Search recipes: `search.php?s=`
  - Get recipe by ID: `lookup.php?i=`
  - Filter by category: `filter.php?c=`
  - Random recipes: `random.php`

## 🎨 Customization

### Colors
The app uses a consistent color scheme:
- **Primary**: #FF6B6B (Coral Red)
- **Secondary**: #2C3E50 (Dark Blue)
- **Background**: #F8F9FA (Light Gray)
- **Text**: #34495E (Dark Gray)

### Styling
All styles are defined using `StyleSheet.create()` for optimal performance and maintainability.

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Dependencies issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Expo CLI not found**
   ```bash
   npm install -g expo-cli
   ```

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for providing the recipe API
- [Expo](https://expo.dev/) for the amazing development platform
- [React Navigation](https://reactnavigation.org/) for navigation solutions
- [React Native](https://reactnative.dev/) for the cross-platform framework
