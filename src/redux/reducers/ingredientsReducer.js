// src/redux/reducers/ingredientsReducer.js
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    FETCH_INGREDIENT_SUGGESTIONS_SUCCESS,
    FETCH_INGREDIENT_SUGGESTIONS_FAILURE,
    CLEAR_INGREDIENT_SUGGESTIONS
  } from '../actions/types';
  
  const initialState = {
    ingredients: [],
    suggestions: [],
    error: null,
  };
  
  const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_INGREDIENT:
        return { ...state, ingredients: [...state.ingredients, action.payload] };
      case REMOVE_INGREDIENT:
        return {
          ...state,
          ingredients: state.ingredients.filter((ingredient) => ingredient !== action.payload),
        };
      case FETCH_INGREDIENT_SUGGESTIONS_SUCCESS:
        return { ...state, suggestions: action.payload, error: null };
      case FETCH_INGREDIENT_SUGGESTIONS_FAILURE:
        return { ...state, suggestions: [], error: action.payload };
      case CLEAR_INGREDIENT_SUGGESTIONS:
        return { ...state, suggestions: [] };
      default:
        return state;
    }
  };
  
  export default ingredientsReducer;
  