import { createSlice } from '@reduxjs/toolkit';
import fetchRandomCocktail from './asyncThunks';

const initialState = {
  activeModal: null,
  randomCocktail: [],
};

const appConfigurationsSlice = createSlice({
  name: 'appConfigurations',
  initialState,
  reducers: {
    changeModalKey: (state, action) => {
      state.activeModal = action.payload;
    },
  },
  extraReducers: {
    [fetchRandomCocktail.fulfilled]: (state, action) => {
      state.randomCocktail = action.payload;
    },
  },
});

export default appConfigurationsSlice;
