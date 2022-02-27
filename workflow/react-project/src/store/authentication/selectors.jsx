import { createSelector } from '@reduxjs/toolkit';

const getAuthenticationState = state => state.authentication || {};

export const selectAuthenticationLoading = createSelector(getAuthenticationState, data => data.loading);
export const selectAuthenticationToken = createSelector(getAuthenticationState, data => data.token);
