import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const performOCR = createApi({
  reducerPath: "performOCR",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/ocr`,
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
      const states = getState();
      const token = states.auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    performOCR: builder.mutation({
      query: (ocrData) => ({
        url: "/",
        method: "POST",
        body: ocrData,
      }),
    }),
  }),
});

export const { usePerformOCRMutation } = performOCR;