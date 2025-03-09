import { WALLET_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const walletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fundWallet: builder.mutation({
      query: (data) => ({
        url: `${WALLET_URL}/fund-wallet`,
        method: "POST",
        body: data,
      }),
    }),

    makePayment: builder.mutation({
      query: (data) => ({
        url: `${WALLET_URL}/make-payment`,
        method: "POST",
        body: data,
      }),
    }),

    paymentCallback: builder.query({
      query: () => ({
        url: `${WALLET_URL}/free-workers`,
      }),
      providesTags: ["Wallet"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useFundWalletMutation,
  useMakePaymentMutation,
  usePaymentCallbackQuery,
} = walletApiSlice;
