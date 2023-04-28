import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isAuthenticated: false,
  loginView: false,
  registerView: false,
  isLogedIn: false,
  resetPasswordRequest: false,
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state) {
      state.isAuthenticated = true;
    },
    setLogoutState(state) {
      state.isAuthenticated = false;
    },
    setIsLogedIn(state) {
      state.isLogedIn = true;
    },
    setOpenPasswordReset(state) {
      state.resetPasswordRequest = true;
    },
    setClosePasswordReset(state) {
      state.resetPasswordRequest = false;
    },
    setUsername(state, action) {
      state.username = action.payload
    },
    removeUsername(state) {
      state.username = ""
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },
});

export const {
  setAuthState,
  setLogoutState,
  setIsLogedIn,
  setUsername,
  removeUsername,
  setOpenPasswordReset,
  setClosePasswordReset,
} = authSlice.actions;
export default authSlice.reducer;
