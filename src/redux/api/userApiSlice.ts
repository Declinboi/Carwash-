import { apiSlice } from "./apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/api/proxy/Users",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/api/register",
        method: "POST",
        body: data,
      }),
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/api/create",
        method: "POST",
        body: data,
      }),
    }),

    createWasher: builder.mutation({
      query: (data) => ({
        url: "/api/createwasher",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/api/login",
        method: "POST",
        body: data,
      }),
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    showUserDetails: builder.query({
      query: (id) => ({
        url: `/api/show/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    editUserDetails: builder.query({
      query: (id) => ({
        url: `/api/edit/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `/api/update/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "api/logout",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    logoutAllDevice: builder.mutation<void, void>({
      query: () => ({
        url: "api/logout-all",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useLogoutAllDeviceMutation,
  useDeleteUserMutation,
  useUpdateUserDetailsMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useCreateWasherMutation,
  useCreateAdminMutation,
  useShowUserDetailsQuery,
  useEditUserDetailsQuery,
} = userApiSlice;
