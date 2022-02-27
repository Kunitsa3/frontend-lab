import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthenticationTokenAfterSignUp, fetchAuthenticationTokenAfterSignIn } from './action';

const initialState = {
  token: localStorage.getItem('token') || '',
  loading: false,
  errorMessage: '',
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  extraReducers: {
    [fetchAuthenticationTokenAfterSignUp.pending]: state => {
      state.loading = true;
      state.token = '';
      state.errorMessage = '';
    },
    [fetchAuthenticationTokenAfterSignUp.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    [fetchAuthenticationTokenAfterSignUp.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },

    [fetchAuthenticationTokenAfterSignIn.pending]: state => {
      state.loading = true;
      state.token = '';
      state.errorMessage = '';
    },
    [fetchAuthenticationTokenAfterSignIn.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    [fetchAuthenticationTokenAfterSignIn.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },
  },
});

export default authenticationSlice;
