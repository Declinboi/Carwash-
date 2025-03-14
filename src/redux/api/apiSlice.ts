import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { BASE_URL } from "../constants";

// Custom base query using Axios
const axiosBaseQuery: BaseQueryFn<
  { url: string; method?: string; data?: any; params?: any }, // Request type
  unknown, // Response type
  { status: number; data: any } // Error type
> = async ({ url, method = "GET", data, params }) => {
  try {
    const result = await axios({
      url: `${BASE_URL}${url}`,
      method,
      data,   // Used instead of "body"
      params, // Optional query params
      // withCredentials: true, // If you need cookies (CORS setup required)
    });

    return { data: result.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      error: {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || "Something went wrong",
      },
    };
  }
};

// Create API Slice using Axios
export const apiSlice = createApi({
  baseQuery: axiosBaseQuery,
  tagTypes: [
    "User",
    "UserTasks",
    "Wallet",
    "Services",
    "Cards",
    "Workers",
    "Booking",
    "Application",
  ],
  endpoints: () => ({}),
});
