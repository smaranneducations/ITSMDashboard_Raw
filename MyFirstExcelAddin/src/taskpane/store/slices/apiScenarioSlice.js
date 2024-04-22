import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiScenarioSlice = createApi({
  reducerPath: 'apiScenario',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
  tagTypes: ['Scenario'],  // Define a tag type
  endpoints: (builder) => ({
    // Query endpoint for getting scenario data
    getScenarioData: builder.query({
      query: () => '/fetchdata/Scenario',
      providesTags: ['Scenario'],  // This endpoint provides the 'Scenario' tag
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
      invalidatesTags: ['Scenario'],  // Invalidate the 'Scenario' tag upon mutation
    }),
    // New mutation endpoint to delete scenario records from the database
    deleteScenarioInDBRecords: builder.mutation({
      query: ({ tableName, scenarioCodes }) => ({
        url: `/deleteRecordsByScenarioCode/${tableName}`,
        method: 'POST',
        body: JSON.stringify(scenarioCodes),
        headers: {
            'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Scenario'],  // Invalidate the 'Scenario' tag upon mutation
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetScenarioDataQuery,
  useUpsertScenarioRecordInDBMutation,
  useDeleteScenarioInDBRecordsMutation
} = apiScenarioSlice;
