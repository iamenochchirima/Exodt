import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        headers.set('authorization', `JWT ${token}`)  
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => '/auth/users/me/'
    }),
    getPosts: builder.query({
      query: () => '/api/'
    }),
    getPost: builder.query({
      query: id => `/api/post/${id}/`
    }),
    verifyUser: builder.mutation({
      query: (body) => ({
        url: '/auth/users/activation/',
        method: 'POST',
        body,
      })
    })
  }),
})

export const { 
  useGetUserDetailsQuery, 
  useGetPostsQuery, 
  useGetPostQuery,
  useVerifyUserMutation} = authApi