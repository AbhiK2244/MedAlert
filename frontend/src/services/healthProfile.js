import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const healthProfileApi = createApi({
  reducerPath: "healthProfileApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}/health-profiles`, credentials: "include" }),
  endpoints: (builder) => ({
    createProfile: builder.mutation({
      query: (profileData) => ({
        url: "/",
        method: "POST",
        body: profileData,
        credentials: "include",
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ id, ...profileData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: profileData,
      }),
    }),
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    getProfiles: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useCreateProfileMutation, useUpdateProfileMutation, useDeleteProfileMutation, useGetProfilesQuery } = healthProfileApi;
