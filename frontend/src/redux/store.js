import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { healthProfileApi } from "../services/healthProfile";
import { analysisReportApi } from "../services/analysisReport";
import { authSlice } from "./reducers/auth.reducer";
import { performOCR } from "../services/performOCR";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [healthProfileApi.reducerPath]: healthProfileApi.reducer,
    [analysisReportApi.reducerPath]: analysisReportApi.reducer,
    [performOCR.reducerPath]: performOCR.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      healthProfileApi.middleware,
      analysisReportApi.middleware,
      performOCR.middleware
    ),
});
