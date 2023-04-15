import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  feedTab: "top",
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
  } = appSlice.actions;
  export default appSlice.reducer;
