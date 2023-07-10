import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  postCreated: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostCreated(state) {
      state.postCreated = true;
    },
    closePostCreated(state) {
      state.postCreated = false;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.posts,
        };
      },
    },
  },
});

export const { setPostCreated, closePostCreated } = postsSlice.actions;
export default postsSlice.reducer;
