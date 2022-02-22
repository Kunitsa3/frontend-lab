import { configureStore } from '@reduxjs/toolkit';
import appConfigurationsSlice from './appConfigurations';
import randomCocktailSlice from './randomCocktail';

export const { changeModalKey } = appConfigurationsSlice.actions;
export const { deleteRandomCocktailInformation } = randomCocktailSlice.actions;

const store = configureStore({
  reducer: { appConfigurations: appConfigurationsSlice.reducer, randomCocktail: randomCocktailSlice.reducer },
});

export default store;
