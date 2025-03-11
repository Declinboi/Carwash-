import { APPLICATION_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplication: builder.query({
      query: () => ({
        url: `${APPLICATION_URL}`,
      }),
      providesTags: ["Application"],
      keepUnusedDataFor: 5,
    }),

    newApplication: builder.mutation({
      query: (data) => ({
        url: `${APPLICATION_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    getApplication: builder.query({
      query: (id) => ({
        url: `${APPLICATION_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateApplication: builder.mutation({
      query: ({ id, data }) => ({
        url: `${APPLICATION_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `${APPLICATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useGetAllApplicationQuery,
  useNewApplicationMutation,
  useGetApplicationQuery,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = applicationApiSlice;
