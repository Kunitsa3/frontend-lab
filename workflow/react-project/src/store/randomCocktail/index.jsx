import { createSlice } from '@reduxjs/toolkit';
import { fetchRandomCocktail } from './action';
import { normalizeRandomCocktailData } from './utils';

const initialState = {
  details: {},
  loading: false,
};

const randomCocktailSlice = createSlice({
  name: 'randomCocktail',
  initialState,
  reducers: {
    deleteRandomCocktailInformation: state => {
      state.details = {};
    },
  },
  extraReducers: {
    [fetchRandomCocktail.pending]: state => {
      state.loading = true;
    },
    [fetchRandomCocktail.fulfilled]: (state, action) => {
      const cocktailData = normalizeRandomCocktailData(action.payload);
      state.details.cocktailName = cocktailData?.strDrink;
      state.details.cocktailPicture = cocktailData?.strDrinkThumb;
      state.details.instructions = cocktailData?.strInstructions;

      state.details.ingredientsDetails = Object.entries(cocktailData || {}).reduce((acc, [key, value]) => {
        if (key.includes('strIngredient') && value) {
          const quantityKey = key.replace('strIngredient', 'strMeasure');
          const measure = cocktailData[quantityKey];

          return [
            ...acc,
            {
              ingredient: value,
              quantity: measure?.match(/[\s\d/\/]+/)?.join(''),
              unit: measure?.match(/[a-z ]/gi)?.join(''),
            },
          ];
        }
        return acc;
      }, []);

      state.loading = false;
    },
  },
});

export default randomCocktailSlice;
