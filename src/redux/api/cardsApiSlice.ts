import { CARDS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const cardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCards: builder.query({
      query: () => ({
        url: "/api/admin/allcards",
      }),
      providesTags: ["Cards"],
      keepUnusedDataFor: 5,
    }),

    getUserCards: builder.query({
      query: () => "/api/usercards",
    }),

    createCard: builder.mutation({
      query: (data) => ({
        url: `${CARDS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    getCardDetails: builder.query({
      query: (card) => ({
        url: `${CARDS_URL}/${card}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateCardDetails: builder.mutation({
      query: ({ card, data }) => ({
        url: `${CARDS_URL}/${card}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cards"],
    }),

    deleteCard: builder.mutation({
      query: (card) => ({
        url: `${CARDS_URL}/${card}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cards"],
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useUpdateCardDetailsMutation,
  useDeleteCardMutation,
  useCreateCardMutation,
  useGetUserCardsQuery,
  useGetCardDetailsQuery,
} = cardsApiSlice;
