import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiScenarioSlice = createApi({
  reducerPath: 'apiScenario',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
  tagTypes: ['Scenario'],  // Define a tag type
  endpoints: (builder) => ({
    // Query endpoint for getting scenario data
    getScenarioData: builder.query({
      query: () => '/fetchdata/Scenario',
      responseHandler: 'json', // Directly handle as JSON
      providesTags: ['Scenario'],  // This endpoint provides the 'Scenario' tag
    }),
    //filter with tansform also think of how to use queryFn or baseQuery
    getScenarioDataTransformed: builder.query({
      query: () => '/fetchdata/Scenario',
      responseHandler: 'json',
      providesTags: ['Scenario'],
      transformResponse: (response, meta, arg) => {
        // Assuming `arg` is the filter array
        return response.filter(item => {
          // Apply all filters; return true if item passes all filters
          return arg.every(filter => {
            return item[filter.columnName]?.toString().includes(filter.filterValue);
          });
        });
      },
    }),
    // Adding a filtered data fetching endpoint for POST request as a mutation
    getScenarioDataFiltered: builder.mutation({
      query: (filters) => ({
          url: `/fetchDataByFilter/Scenario`,
          method: 'POST',
          body: filters  // Ensuring the body is an object that RTK will serialize
      }),
      responseHandler: 'json',  // Directly handle as JSON
      invalidatesTags: ['Scenario'],  // Optionally invalidate tags if necessary
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
  useGetScenarioDataQuery,useGetScenarioDataFilteredMutation,useGetScenarioDataTransformedQuery,
  useUpsertScenarioRecordInDBMutation,
  useDeleteScenarioInDBRecordsMutation
} = apiScenarioSlice;