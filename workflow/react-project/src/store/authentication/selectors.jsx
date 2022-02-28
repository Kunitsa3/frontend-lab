import { createSelector } from '@reduxjs/toolkit';

const getAuthenticationState = state => state.authentication || {};

export const selectAuthenticationLoading = createSelector(getAuthenticationState, data => data.loading);
export const selectAuthenticationIsUserLoggedIn = createSelector(getAuthenticationState, data => data.isUserLoggedIn);
