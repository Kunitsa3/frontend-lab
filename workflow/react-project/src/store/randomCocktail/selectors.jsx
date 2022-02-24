import { createSelector } from '@reduxjs/toolkit';

const getState = state => state;

export const selectRandomCocktailLoading = createSelector(getState, state => state.randomCocktail.loading);

export const selectRandomCocktailDetails = createSelector(getState, state => state.randomCocktail.details);
