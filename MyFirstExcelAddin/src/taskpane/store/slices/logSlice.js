// logSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const logSlice = createSlice({
  name: 'log',
  initialState: {
    messages: [],
  },
  reducers: {
    addLog: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addLog } = logSlice.actions;

export default logSlice.reducer;
