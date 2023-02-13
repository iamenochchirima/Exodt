import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   messageUserName: null,
   activeChatData: null,
   activeChat: null,
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
    },
    setActiveChat: (state, {payload}) => {
      state.activeChat = payload
    }
  }
});

export const {setActiveChat, setMessageUserInfo, setActiveChatData} = chatSlice.actions
export default chatSlice.reducer