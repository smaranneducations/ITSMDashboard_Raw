// store/slices/dialogSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    response: '',
  },
  reducers: {
    userResponse: (state, action) => {
      state.response = action.payload;
    },
  },
});

export const { userResponse } = dialogSlice.actions;
export default dialogSlice.reducer;
