// store.js
import { configureStore } from '@reduxjs/toolkit';
import logReducer from './slices/logSlice';
import dialogReducer from './slices/dialogSlice'; // Ensure the import path matches your file structure
import { apiSlice } from './slices/apiScenarioSlice.js'; // tried without .js as well
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    log: logReducer,
    dialog: dialogReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)



