import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRandomCocktail = createAsyncThunk('/fetchRandomCocktail', async () => {
  const response = await fetch('/api/cocktails/random');

  return response.json();
});
