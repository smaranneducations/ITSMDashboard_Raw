// src/store/slices/apiScenarioSlice.js
import { createApi } from '@reduxjs/toolkit/query/react' // note import { createApi } from '@reduxjs/toolkit/query' will give error store_slices_apiScenarioSlice_js__WEBPACK_IMPORTED_MODULE_1_.useGetScenarioData) is not a function
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
  endpoints: (builder) => ({
    getScenarioData: builder.query({
      query: () => '/fetchdata/Scenario',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetScenarioDataQuery } = apiSlice;
