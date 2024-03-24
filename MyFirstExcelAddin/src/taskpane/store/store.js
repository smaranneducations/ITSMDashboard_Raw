// store.js
import { configureStore } from '@reduxjs/toolkit';
import logReducer from './slices/logSlice';
import dialogReducer from './slices/dialogSlice'; // Ensure the import path matches your file structure

export const store = configureStore({
  reducer: {
    log: logReducer,
    dialog: dialogReducer,
  },
});



