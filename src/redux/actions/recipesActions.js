import axios from 'axios';
import { FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE, FETCH_RECIPE_DETAILS_SUCCESS, FETCH_RECIPE_DETAILS_FAILURE } from './types';

const SPOONACULAR_API_KEY = '3de2a8008be243b59371487f392cb676'; // Replace with your Spoonacular API key

export const fetchRecipes = (ingredients) => async (dispatch) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        number: 10,
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    dispatch({ type: FETCH_RECIPES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_RECIPES_FAILURE, payload: error.message });
  }
};

export const fetchRecipeDetails = (recipeId) => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    dispatch({ type: FETCH_RECIPE_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_RECIPE_DETAILS_FAILURE, payload: error.message });
  }
};

export const fetchIngredientSuggestions = (query) => async (dispatch) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/food/ingredients/autocomplete', {
      params: {
        query,
        number: 10,
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    dispatch({ type: FETCH_INGREDIENT_SUGGESTIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_INGREDIENT_SUGGESTIONS_FAILURE, payload: error.message });
  }
};
