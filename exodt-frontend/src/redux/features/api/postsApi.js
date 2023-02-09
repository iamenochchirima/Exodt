import { apiSlice } from './apiSlice'

export const postsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
          query: () => ({
            url: '/api/posts/',
            method: 'GET',
          })
        }),
        getPostDetails: builder.query({
          query: (id) => ({
            url: `/api/posts/${id}/`,
            method: 'GET',
          })
        }),
        createPost: builder.mutation({
          query: (body) => ({
            url: '/api/posts/',
            method: 'POST',
            body,
          })
        }),
        EditPost: builder.mutation({
          query: ({id, body}) => ({
            url: `/api/posts/${id}/`,
            method: 'PUT',
            body,
          })
        }),
        DeletePost: builder.mutation({
          query: (id) => ({
            url: `/api/posts/${id}/`,
            method: 'DELETE',
          })
        }),
    }),
});

export const {
    useGetPostsQuery, 
    useGetPostDetailsQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation
} = postsApi