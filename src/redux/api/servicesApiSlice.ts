import { SERVICES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => ({
        url: `${SERVICES_URL}`,
      }),
      providesTags: ["Services"],
      keepUnusedDataFor: 5,
    }),

    createService: builder.mutation({
      query: (data) => ({
        url: "/api/CreateService",
        method: "POST",
        body: data,
      }),
    }),

    singleService: builder.query({
      query: (id) => ({
        url: `${SERVICES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateServices: builder.mutation({
      query: (data) => ({
        url: `${SERVICES_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),

    deleteServices: builder.mutation({
      query: (userId) => ({
        url: `${SERVICES_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useSingleServiceQuery,
  useUpdateServicesMutation,
  useDeleteServicesMutation,
} = servicesApiSlice;
