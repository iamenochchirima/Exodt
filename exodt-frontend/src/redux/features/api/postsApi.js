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
        EditPost: builder.mutation({
          query: ({id, body}) => ({
            url: `/api/post/edit/${id}/`,
            method: 'PUT',
            body,
          })
        }),
        DeletePost: builder.mutation({
          query: (id) => ({
            url: `/api/post/delete/${id}`,
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