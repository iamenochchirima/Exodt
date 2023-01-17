import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('accessToken')
      if (token) {
       // include token in req header
        headers.set('authorization', `JWT ${token}`)  
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: '/auth/users/me/',
        method: 'GET',
      }),
    }),
    getPosts: builder.query({
      query: () => '/api/'
    }),
    getPost: builder.query({
      query: id => `/api/post/${id}`
    }),
  }),
})

export const { useGetUserDetailsQuery, useGetPostsQuery, useGetPostQuery} = authApi