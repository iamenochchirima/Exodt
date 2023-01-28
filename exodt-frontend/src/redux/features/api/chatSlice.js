import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   messageUserName: null,
   activeChatData: null,
  }

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers:{
    setMessageUserInfo: (state, {payload}) => {
      state.messageUserName = payload
    },
    setActiveChatData: (state, {payload}) => {
      state.activeChatData = payload
    }
  }
});

export const { setMessageUserInfo, setActiveChatData} = chatSlice.actions
export default chatSlice.reducer