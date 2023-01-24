import { apiSlice } from './apiSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => '/auth/users/me/'
    }),
    getUserProfiles: builder.query({
      query: () => '/api/profiles/'
    }),
    getUserProfileDetails: builder.query({
      query: id => `/api/profiles/${id}`
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: '/auth/users/activation/',
        method: 'POST',
        body,
      })
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: '/auth/users/',
        method: 'POST',
        body,
      })
    }),
    logIn: builder.mutation({
      query: (body) => ({
        url: '/auth/jwt/create/',
        method: 'POST',
        body,
      })
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: '/auth/users/reset_password/',
        method: 'POST',
        body,
      })
    }),
    resetPasswordConfirm: builder.mutation({
      query: (body) => ({
        url: '/auth/users/reset_password_confirm/',
        method: 'POST',
        body,
      })
    }),
  }),
})

export const { 
  useGetUserDetailsQuery, 
  useGetUserProfilesQuery,
  useGetUserProfileDetailsQuery,
  useVerifyEmailMutation,
  useSignUpMutation,
  useLogInMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
} = authApi
