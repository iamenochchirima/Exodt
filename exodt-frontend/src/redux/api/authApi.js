import { authApiSlice } from "./authApiSlice";

export const authApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/token/",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: (body) => ({
        url: "/auth/logout/",
        method: "POST",
        body,
      }),
    }),
    loadUser: builder.query({
      query: (body) => ({
        url: "/user_profiles/load_user/",
        method: "GET",
        body,
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: "/user_accounts/delete/",
        method: "POST",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: "/user_profiles/update_profile/",
        method: "PUT",
        body,
      }),
    }),
    updateUserAccount: builder.mutation({
      query: (body) => ({
        url: "/user_accounts/update/",
        method: "PUT",
        body,
      }),
    }),
    changeEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/change_email",
        method: "POST",
        body,
      }),
    }),
    mainNewsletter: builder.mutation({
      query: () => ({
        url: "/auth/sendmainmails/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoadUserQuery,
  useLazyLoadUserQuery,
  useLogoutMutation,
  useUpdateUserProfileMutation,
  useUpdateUserAccountMutation,
  useChangeEmailMutation,
  useMainNewsletterMutation,
  useDeleteAccountMutation
} = authApi;
