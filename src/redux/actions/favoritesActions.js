// src/redux/actions/favoritesActions.js
import { ADD_FAVORITE, REMOVE_FAVORITE } from './types';

export const addFavorite = (recipe) => ({
  type: ADD_FAVORITE,
  payload: recipe,
});

export const removeFavorite = (recipeId) => ({
  type: REMOVE_FAVORITE,
  payload: recipeId,
});
