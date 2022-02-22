import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: null,
};

const appConfigurationsSlice = createSlice({
  name: 'appConfigurations',
  initialState,
  reducers: {
    changeModalKey: (state, action) => {
      state.activeModal = action.payload;
    },
  },
});

export default appConfigurationsSlice;
