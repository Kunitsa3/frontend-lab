import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthenticationTokenAfterSignUp, fetchAuthenticationTokenAfterSignIn } from './action';

const initialState = {
  isUserLoggedIn: !!localStorage.getItem('token'),
  loading: false,
  errorMessage: '',
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  extraReducers: {
    [fetchAuthenticationTokenAfterSignUp.pending]: state => {
      state.loading = true;
      state.isUserLoggedIn = false;
      state.errorMessage = '';
    },
    [fetchAuthenticationTokenAfterSignUp.fulfilled]: state => {
      state.isUserLoggedIn = true;
      state.loading = false;
    },
    [fetchAuthenticationTokenAfterSignUp.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },

    [fetchAuthenticationTokenAfterSignIn.pending]: state => {
      state.loading = true;
      state.isUserLoggedIn = false;
      state.errorMessage = '';
    },
    [fetchAuthenticationTokenAfterSignIn.fulfilled]: state => {
      state.isUserLoggedIn = true;
      state.loading = false;
    },
    [fetchAuthenticationTokenAfterSignIn.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },
  },
});

export default authenticationSlice;
