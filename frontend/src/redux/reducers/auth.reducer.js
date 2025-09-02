import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || {},  //localstorage only stores string
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.accessToken = actions.payload.accessToken;
      state.user = actions.payload.user;
      localStorage.setItem("accessToken", actions.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(actions.payload.user));
    },
    logout: (state, actions) => {
      state.accessToken = null;
      state.user = null;
      localStorage.clear()
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
