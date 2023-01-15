import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const register = createAsyncThunk(
//     'users/fetchByIdStatus',
//     async (userId: number, thunkAPI) => {
//     const response = await userAPI.fetchById(userId)
//     return response.data
//   }
// )

const userSlice = createSlice({
    name: 'user',
    initialState:{
        isAuthenticated: false,
        user: null,
        loading: false,
        registered: false,
    },
    reducers: {
        resetRegistered: state => {
            state.registered = false;
        },
    },
  })
  
  export const { resetRegistered } = userSlice.actions
  export default userSlice.reducer