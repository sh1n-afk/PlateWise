import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes',
  params: {
    apiKey: '3de2a8008be243b59371487f392cb676', // Replace with your Spoonacular API key
  },
});

export const fetchRecipesByIngredients = (ingredients) => {
  return api.get('/findByIngredients', {
    params: {
      ingredients: ingredients.join(','),
      number: 10,
    },
  });
};
