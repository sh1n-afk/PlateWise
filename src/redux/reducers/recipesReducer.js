// src/redux/reducers/recipesReducer.js
import { FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE, FETCH_RECIPE_DETAILS_SUCCESS, FETCH_RECIPE_DETAILS_FAILURE } from '../actions/types';

const initialState = {
  recipes: [],
  recipeDetails: {},
  error: null,
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS:
      return { ...state, recipes: action.payload, error: null };
    case FETCH_RECIPES_FAILURE:
      return { ...state, recipes: [], error: action.payload };
    case FETCH_RECIPE_DETAILS_SUCCESS:
      return { ...state, recipeDetails: action.payload, error: null };
    case FETCH_RECIPE_DETAILS_FAILURE:
      return { ...state, recipeDetails: {}, error: action.payload };
    default:
      return state;
  }
};

export default recipesReducer;
