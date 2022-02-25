import { createSlice } from '@reduxjs/toolkit';
import { fetchRandomCocktail } from './action';
import { normalizeRandomCocktailData } from './utils';

const initialState = {
  details: {},
  loading: false,
};

const randomCocktailSlice = createSlice({
  name: 'randomCocktail',
  initialState,
  reducers: {
    deleteRandomCocktailInformation: state => {
      state.details = {};
    },
  },
  extraReducers: {
    [fetchRandomCocktail.pending]: state => {
      state.loading = true;
    },
    [fetchRandomCocktail.fulfilled]: (state, action) => {
      state.details = normalizeRandomCocktailData(action.payload);
      state.loading = false;
    },
  },
});

export default randomCocktailSlice;
