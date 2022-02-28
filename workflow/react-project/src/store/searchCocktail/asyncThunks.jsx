import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const fetchCocktail = createAsyncThunk(
  'fetchCocktail',
  async ({ searchParameter, searchString }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://stdlab-api.herokuapp.com/api/cocktails/search?${searchParameter}=${searchString}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer  ${localStorage.getItem('token')}`,
          },
        },
      );

      if (response.status === 403) {
        const errorMessage = (await response.json()).message;

        toast.warning(errorMessage);

        return rejectWithValue(errorMessage);
      }

      const content = await response.json();
      console.log(content);

      return content;
    } catch (error) {
      toast.warning(error);

      return error;
    }
  },
);
