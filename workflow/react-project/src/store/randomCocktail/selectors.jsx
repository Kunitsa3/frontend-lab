import { createSelector } from '@reduxjs/toolkit';

const getRandomCocktail = state => state.randomCocktail || {};

export const selectRandomCocktailLoading = createSelector(getRandomCocktail, data => data.loading);
export const selectRandomCocktailDetails = createSelector(getRandomCocktail, data => data.details);
