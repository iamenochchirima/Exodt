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
    createPost: builder.mutation({
      query: (body) => ({
        url: "/posts/create/",
        method: "POST",
        body,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/delete/${id}`,
        method: "DELETE"
      }),
    }),
    updatePost: builder.mutation({
      query: (id) => ({
        url: `/posts/update/${id}`,
        method: "POST"
      }),
    }),
    likePost: builder.mutation({
      query: (body) => ({
        url: `/posts/like/`,
        method: "POST",
        body,
      }),
    }),
    unlikePost: builder.mutation({
      query: (body) => ({
        url: `/posts/unlike/`,
        method: "DELETE",
        body,
      }),
    }),
     createComment: builder.mutation({
      query: (body) => ({
        url: "/posts/comments/create/",
        method: "POST",
        body,
      }),
    }),
    updateComment: builder.mutation({
      query: (body) => ({
        url: `/posts/comments/${id}/update/`,
        method: "POST",
        body,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/posts/comments/delete/${id}`,
        method: "DELETE",
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
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useDeletePostMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useLoginMutation,
  useLoadUserQuery,
  useLazyLoadUserQuery,
  useUpdateUserProfileMutation,
  useUpdateUserAccountMutation,
  useChangeEmailMutation,
  useMainNewsletterMutation,
  useDeleteAccountMutation
} = authApi;
