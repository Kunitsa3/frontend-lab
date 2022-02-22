import { createSlice } from '@reduxjs/toolkit';
import fetchRandomCocktail from './asyncThunks';

const initialState = {
  details: [],
  status: 'initial',
};

const randomCocktailSlice = createSlice({
  name: 'randomCocktail',
  initialState,
  reducers: {
    deleteRandomCocktailInformation: state => {
      state.details = [];
      state.status = 'initial';
    },
  },
  extraReducers: {
    [fetchRandomCocktail.pending]: state => {
      state.status = 'pending';
    },
    [fetchRandomCocktail.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.status = 'fulfilled';
    },
  },
});

export default randomCocktailSlice;
