import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { healthProfileApi } from "../services/healthProfile";
import { authSlice } from "./reducers/auth.reducer";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [healthProfileApi.reducerPath]: healthProfileApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, healthProfileApi.middleware),
});
