// src/store/slices/apiScenarioSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'apiScenario',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
  endpoints: (builder) => ({
    // Query endpoint for getting scenario data
    getScenarioData: builder.query({
      query: () => '/fetchdata/Scenario',
    }),
    // Mutation endpoint for upserting scenario data
    upsertScenarioRecordInDB: builder.mutation({
      query: ({ tableName, data }) => ({
        url: `/insertorupdaterecord_Scenario/${tableName}`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetScenarioDataQuery, useUpsertScenarioRecordInDBMutation } = apiSlice;
