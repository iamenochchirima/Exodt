import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isAuthenticated: false,
  loginView: false,
  registerView: false,
  isLogedIn: false,
  resetPasswordRequest: false,
  profileInfo: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(state, {payload}) {
      localStorage.setItem('accessToken', payload.access)
      localStorage.setItem('refreshToken', payload.refresh)
      state.isAuthenticated = true;
    },
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
    setProfileInfo(state, action) {
      state.profileInfo = action.payload
    },
    removeProfileInfo(state) {
      state.profileInfo = {}
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
  setTokens,
  setIsLogedIn,
  setProfileInfo,
  removeProfileInfo,
  setOpenPasswordReset,
  setClosePasswordReset,
} = authSlice.actions;
export default authSlice.reducer;
