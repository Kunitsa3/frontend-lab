import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRandomCocktail = createAsyncThunk('/fetchRandomCocktail', async () => {
  const response = await fetch('http://stdlab-api.herokuapp.com/api/cocktails/random');

  return response.json();
});
