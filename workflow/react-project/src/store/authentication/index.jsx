import { createSlice } from '@reduxjs/toolkit';
import { fetchSignUp, fetchSignIn } from './action';

const initialState = {
  isUserLoggedIn: !!localStorage.getItem('token'),
  loading: false,
  errorMessage: '',
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  extraReducers: {
    [fetchSignUp.pending]: state => {
      state.loading = true;
      state.isUserLoggedIn = false;
      state.errorMessage = '';
    },
    [fetchSignUp.fulfilled]: state => {
      state.isUserLoggedIn = true;
      state.loading = false;
    },
    [fetchSignUp.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },

    [fetchSignIn.pending]: state => {
      state.loading = true;
      state.isUserLoggedIn = false;
      state.errorMessage = '';
    },
    [fetchSignIn.fulfilled]: state => {
      state.isUserLoggedIn = true;
      state.loading = false;
    },
    [fetchSignIn.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },
  },
});

export default authenticationSlice;
