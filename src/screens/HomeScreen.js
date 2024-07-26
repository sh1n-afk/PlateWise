import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, removeIngredient, fetchIngredientSuggestions, clearIngredientSuggestions } from '../redux/actions/ingredientsActions';
import { fetchRecipes } from '../redux/actions/recipesActions';

const HomeScreen = ({ navigation }) => {
  const [ingredient, setIngredient] = useState('');
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const suggestions = useSelector((state) => state.ingredients.suggestions);
  const recipes = useSelector((state) => state.recipes.recipes);
  const error = useSelector((state) => state.recipes.error);

  useEffect(() => {
    if (ingredient.length > 1) {
      dispatch(fetchIngredientSuggestions(ingredient));
    } else {
      dispatch(clearIngredientSuggestions());
    }
  }, [ingredient, dispatch]);

  const handleAddIngredient = (selectedIngredient) => {
    dispatch(addIngredient(selectedIngredient));
    setIngredient('');
    dispatch(clearIngredientSuggestions());
  };

  // Filter suggestions to only include those that start with the input string
  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.name.toLowerCase().startsWith(ingredient.toLowerCase())
  );

  const handleFetchRecipes = () => {
    if (ingredients.length === 0) {
      Alert.alert('No ingredients', 'Please add at least one ingredient.');
      return;
    }
    dispatch(fetchRecipes(ingredients));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Ingredient:</Text>
      <TextInput
        style={styles.input}
        value={ingredient}
        onChangeText={setIngredient}
      />
      {filteredSuggestions.length > 0 && (
        <FlatList
          data={filteredSuggestions}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAddIngredient(item.name)}>
              <Text style={styles.suggestionItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Button title="Add Ingredient" onPress={() => handleAddIngredient(ingredient)} />
      <Button title="Find Recipes" onPress={handleFetchRecipes} />
      <Button title="View Favorites" onPress={() => navigation.navigate('Favorites')} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingredientItem}>
            <Text>{item}</Text>
            <Button title="Remove" onPress={() => dispatch(removeIngredient(item))} />
          </View>
        )}
      />

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  suggestionItem: {
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default HomeScreen;
