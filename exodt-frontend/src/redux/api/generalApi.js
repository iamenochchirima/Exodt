import { generalApiSlice } from "./generalApiSlice";

export const generalApi = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "/user_accounts/create/",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/users/password-reset/",
        method: "POST",
        body,
      }),
    }),
    ConfirmReset: builder.mutation({
      query: (body) => ({
        url: `users/password-reset/confirm/`,
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ uid, token }) => ({
        url: `/user_accounts/verify-email/${uid}/${token}/`,
        method: "GET",
      }),
    }),
    profileInfo: builder.mutation({
      query: (username) => ({
        url: `/user_profiles/load_profile/${username}/`,
        method: "GET",
      }),
    }),
    updateProfileImage: builder.mutation({
      query: (body) => ({
        url: "/user_profiles/update_profile_image",
        method: "PUT",
        body,
      }),
    }),
    getCountries: builder.query({
      query: () => ({
        url: "/user_profiles/countries/",
        method: "GET",
      }),
    }),
    getAllPosts: builder.query({
      query: () => `/posts/get-posts/`,
    }),
    getAllCategories: builder.query({
      query: () => `/posts/get-categories/`,
    }),
    getFullPost: builder.query({
      query: (id) => ({
        url: `/posts/detail/${id}/`,
        method: "GET",
      }),
    }),
    getCategoryArticles: builder.query({
      query: ({ slug, page = 1, page_size = 3 }) =>
        `/api/category/${slug}/?page=${page}&page_size=${page_size}`,
    }),
    search: builder.query({
      query: ({ searchQuery, page = 1, page_size = 3 }) =>
        `/api/search/?search_query=${searchQuery}&page=${page}&page_size=${page_size}`,
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/api/categories/",
        method: "GET",
      }),
    }),
    signUpNewsletter: builder.mutation({
      query: (body) => ({
        url: "/newsletter/signup/",
        method: "POST",
        body,
      }),
    }),
    newsletterUnsubscribe: builder.mutation({
      query: (token) => ({
        url: `/newsletter/unsubscribe/${token}/`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllCategoriesQuery,
  useGetAllPostsQuery,
  useGetFullPostQuery,
  useSignupMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useConfirmResetMutation,
  useLazyGetCountriesQuery,
  useSignUpNewsletterMutation,
  useUpdateProfileImageMutation,
  useProfileInfoMutation,
  useLazyGetFullArticleQuery,
  useGetSpecialArticlesQuery,
  useGetCategoriesQuery,
  useLazyGetCategoryArticlesQuery,
  useLazySearchQuery,
} = generalApi;
