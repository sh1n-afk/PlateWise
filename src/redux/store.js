import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredientsReducer';
import recipesReducer from './reducers/recipesReducer';
import favoritesReducer from './reducers/favoritesReducer';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
    favorites: favoritesReducer,
  },
});

export default store;
