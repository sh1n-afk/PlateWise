// src/redux/actions/ingredientsActions.js
import axios from 'axios';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  FETCH_INGREDIENT_SUGGESTIONS_SUCCESS,
  FETCH_INGREDIENT_SUGGESTIONS_FAILURE,
  CLEAR_INGREDIENT_SUGGESTIONS
} from './types';

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
});

export const removeIngredient = (ingredient) => ({
  type: REMOVE_INGREDIENT,
  payload: ingredient,
});

export const fetchIngredientSuggestions = (query) => async (dispatch) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/food/ingredients/autocomplete', {
      params: {
        query,
        number: 10,
        apiKey: '3de2a8008be243b59371487f392cb676',
      },
    });
    dispatch({ type: FETCH_INGREDIENT_SUGGESTIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_INGREDIENT_SUGGESTIONS_FAILURE, payload: error.message });
  }
};

export const clearIngredientSuggestions = () => ({
  type: CLEAR_INGREDIENT_SUGGESTIONS,
});
