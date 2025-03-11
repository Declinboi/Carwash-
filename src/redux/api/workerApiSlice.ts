import { WORKER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const workersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkers: builder.query({
      query: () => ({
        url: `${WORKER_URL}`,
      }),
      providesTags: ["Workers"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllWorkersQuery } = workersApiSlice;
