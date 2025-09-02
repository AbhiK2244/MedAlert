import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}/user` }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/signin",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for components
export const { useSignupMutation, useLoginMutation } = authApi;
