import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analysisReportApi = createApi({
  reducerPath: "analysisReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/analysis-reports`,
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
    analysisReport: builder.mutation({
      query: (reportData) => ({
        url: "/",
        method: "POST",
        body: reportData,
      }),
    }),
  }),
});

export const {
    useAnalysisReportMutation,
} = analysisReportApi;
