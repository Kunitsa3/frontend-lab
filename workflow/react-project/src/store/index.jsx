import { configureStore } from '@reduxjs/toolkit';
import appConfigurationsSlice from './appConfigurations';
import authenticationSlice from './authentication';
import randomCocktailSlice from './randomCocktail';
import searchCocktailSlice from './searchCocktail';

const store = configureStore({
  reducer: {
    appConfigurations: appConfigurationsSlice.reducer,
    randomCocktail: randomCocktailSlice.reducer,
    authentication: authenticationSlice.reducer,
    searchCocktail: searchCocktailSlice.reducer,
  },
});

export default store;
