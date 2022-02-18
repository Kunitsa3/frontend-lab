import { configureStore } from '@reduxjs/toolkit';
import appConfigurationsSlice from './appConfigurations';
import fetchRandomCocktail from './appConfigurations/asyncThunks';

export const { changeModalKey: changeModalKey } = appConfigurationsSlice.actions;

const store = configureStore({
  reducer: { appConfigurations: appConfigurationsSlice.reducer },
});

export default store;

store.dispatch(fetchRandomCocktail());
