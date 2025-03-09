import { USERTASKS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userTaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersTask: builder.query({
      query: () => ({
        url: `${USERTASKS_URL}`,
      }),
      providesTags: ["UserTasks"],
      keepUnusedDataFor: 5,
    }),

    assignBooking: builder.mutation({
      query: (data) => ({
        url: `${USERTASKS_URL}/assign`,
        method: "POST",
        body: data,
      }),
    }),

    getFreeWorkers: builder.query({
      query: () => ({
        url: `${USERTASKS_URL}/free-workers`,
      }),
      providesTags: ["UserTasks"],
      keepUnusedDataFor: 5,
    }),

    completedTasks: builder.mutation({
      query: (data) => ({
        url: `${USERTASKS_URL}/complete`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllUsersTaskQuery,
  useAssignBookingMutation,
  useCompletedTasksMutation,
  useGetFreeWorkersQuery,
} = userTaskApiSlice;
