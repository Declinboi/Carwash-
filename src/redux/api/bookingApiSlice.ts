import { BOOKING_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooking: builder.query({
      query: () => ({
        url: `${BOOKING_URL}`,
      }),
      providesTags: ["Booking"],
      keepUnusedDataFor: 5,
    }),

    createBooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    getBooking: builder.query({
      query: () => `${BOOKING_URL}/user`,
    }),

    viewBooking: builder.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetAllBookingQuery,
  useCreateBookingMutation,
  useGetBookingQuery,
  useViewBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApiSlice;
