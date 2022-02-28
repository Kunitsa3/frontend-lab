import { createSelector } from '@reduxjs/toolkit';

const getSearchCocktail = state => state.searchCocktail || {};

export const selectSearchCocktailLoading = createSelector(getSearchCocktail, data => data.loading);
export const selectSearchCocktailDetails = createSelector(getSearchCocktail, data => data.details);
