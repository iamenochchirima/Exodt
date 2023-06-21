import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = localStorage.getItem("refreshToken");

  if (
    result?.error?.data.code === "token_not_valid" &&
    result?.error?.status === 401 &&
    result?.error?.data.detail === "Given token not valid for any token type"
  ) {
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/api/token/refresh/",
          method: "POST",
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );
      if (refreshResult?.data) {
        localStorage.setItem("accessToken", refreshResult.data.access);
        localStorage.setItem("refreshtoken", refreshResult.data.refresh);
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};

export const authApiSlice = createApi({
  reducerPath: "authApiSlice",
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo: function (action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
