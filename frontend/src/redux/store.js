import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { healthProfileApi } from "../services/healthProfile";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [healthProfileApi.reducerPath]: healthProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, healthProfileApi.middleware),
});
