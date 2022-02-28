import { createSlice } from '@reduxjs/toolkit';
import { fetchCocktail } from './action';

const initialState = {
  details: [],
  loading: false,
  errorMessage: '',
};

const searchCocktailSlice = createSlice({
  name: 'searchCocktail',
  initialState,
  extraReducers: {
    [fetchCocktail.pending]: state => {
      state.loading = true;
      state.details = [];
      state.errorMessage = '';
    },
    [fetchCocktail.fulfilled]: (state, action) => {
      state.details = action.payload.drinks;
      state.loading = false;
    },
    [fetchCocktail.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },
  },
});

export default searchCocktailSlice;
