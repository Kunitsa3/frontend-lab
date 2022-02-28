import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const fetchAuthenticationTokenAfterSignUp = createAsyncThunk(
  'fetchAuthenticationToken',
  async ({ values, onSuccess }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://stdlab-api.herokuapp.com/api/sign-up', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.status === 403) {
        const errorMessage = (await response.json()).message;

        toast.warning(errorMessage);

        return rejectWithValue(errorMessage);
      }

      const content = await response.json();

      onSuccess();
      toast.success('Account created successfully');
      localStorage.setItem('token', content.token);

      return content;
    } catch (error) {
      toast.warning(error);

      return error;
    }
  },
);

export const fetchAuthenticationTokenAfterSignIn = createAsyncThunk(
  'fetchAuthenticationToken',
  async ({ values, onSuccess }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://stdlab-api.herokuapp.com/api/sign-in', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.status === 403) {
        const errorMessage = (await response.json()).message;

        toast.warning(errorMessage);

        return rejectWithValue(errorMessage);
      }

      const content = await response.json();

      onSuccess();
      toast.success('Signed in successfully');
      localStorage.setItem('token', content.token);

      return content;
    } catch (error) {
      toast.warning(error);

      return error;
    }
  },
);
