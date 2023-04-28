import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  feedTab: "top",
  manageAccount: false,
  editProfile: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    topTab(state) {
        state.feedTab = "top";
      },
    latestTab(state) {
        state.feedTab = "latest";
      },
    localTab(state) {
        state.feedTab = "local";
      },
    openManageAcc(state) {
      state.manageAccount = true
    },
    closeManageAcc(state) {
      state.manageAccount = false
    },
    openEditProf(state) {
      state.editProfile = true
    },
    closeEditProf(state) {
      state.editProfile = false
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
    topTab,
    latestTab,
    localTab,
    openEditProf,
    openManageAcc,
    closeEditProf,
    closeManageAcc,
  } = appSlice.actions;
  export default appSlice.reducer;
