import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions/favoritesActions';
import { fetchRecipeDetails } from '../redux/actions/recipesActions';

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;
  const dispatch = useDispatch();
  const recipeDetails = useSelector((state) => state.recipes.recipeDetails);
  const loading = useSelector((state) => state.recipes.loading);
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  useEffect(() => {
    dispatch(fetchRecipeDetails(recipe.id));
  }, [dispatch, recipe.id]);

  // Log the recipeDetails object for debugging
  console.log('Recipe Details:', recipeDetails);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(recipe.id));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  // Remove HTML tags from the summary
  const cleanSummary = recipeDetails.summary ? recipeDetails.summary.replace(/<\/?[^>]+(>|$)/g, "") : "";

  // Extract nutritional information from summary using improved regex
  const extractNutrient = (text, nutrient) => {
    const regex = new RegExp(`\\b${nutrient}\\b[^\\d]*(\\d+\\.?\\d*)\\s*(g|mg|kcal|calories|grams|\\b)`, 'i');
    const match = text.match(regex);
    return match ? `${match[1]} ${match[2]}` : 'N/A';
  };

  const extractNutrientFlexible = (text, nutrient) => {
    const regex = new RegExp(`\\b${nutrient}\\b[^\\d]*(\\d+\\.?\\d*)\\s*(\\w+)?`, 'i');
    const match = text.match(regex);
    return match ? `${match[1]} ${match[2] || ''}`.trim() : 'N/A';
  };

  const calories = extractNutrientFlexible(recipeDetails.summary, 'calories');
  const fat = extractNutrientFlexible(recipeDetails.summary, 'fat');
  const protein = extractNutrientFlexible(recipeDetails.summary, 'protein');
  const carbs = extractNutrientFlexible(recipeDetails.summary, 'carbohydrates');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Button
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        onPress={handleToggleFavorite}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{cleanSummary}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutritional Information</Text>
            <Text style={styles.nutrient}>Calories: {calories}</Text>
            <Text style={styles.nutrient}>Fat: {fat}</Text>
            <Text style={styles.nutrient}>Protein: {protein}</Text>
            <Text style={styles.nutrient}>Carbohydrates: {carbs}</Text>
          </View>
          {recipeDetails.analyzedInstructions && recipeDetails.analyzedInstructions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Instructions</Text>
              {recipeDetails.analyzedInstructions[0].steps.map((step) => (
                <Text key={step.number} style={styles.instructionStep}>{step.number}. {step.step}</Text>
              ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
  },
  nutrient: {
    fontSize: 16,
    marginBottom: 4,
  },
  instructionStep: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default RecipeDetailsScreen;
