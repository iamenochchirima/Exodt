import { apiSlice } from './apiSlice'

export const postsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
          query: () => '/api/'
        }),
        getPostDetails: builder.query({
          query: id => `/api/post/${id}/`
        }),
        createPost: builder.mutation({
          query: (body) => ({
            url: '/api/post/create/',
            method: 'POST',
            body,
          })
        }),
    }),
});

export const {
    useGetPostsQuery, 
    useGetPostDetailsQuery,
    useCreatePostMutation,
} = postsApi