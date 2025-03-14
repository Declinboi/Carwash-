import { apiSlice } from "./apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/api/Users",
        method:"GET",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/api/register",
        method: "POST",
        data,
      }),
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/api/create",
        method: "POST",
         data,
      }),
    }),

    createWasher: builder.mutation({
      query: (data) => ({
        url: "/api/createwasher",
        method: "POST",
        data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/api/login",
        method: "POST",
         data,
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
        method:"GET",
      }),
      keepUnusedDataFor: 5,
    }),

    editUserDetails: builder.query({
      query: (id) => ({
        url: `/api/edit/${id}`,
        method:"GET",
      }),
      keepUnusedDataFor: 5,
    }),

    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `/api/update/${data.userId}`,
        method: "PUT",
         data,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/api/logout",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/forgot-password",
        method: "POST",
        data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/reset-password",
        method: "POST",
         data,
      }),
    }),
    logoutAllDevice: builder.mutation<void, void>({
      query: () => ({
        url: "/api/logout-all",
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
