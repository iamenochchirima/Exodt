import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin, useVerifyUser, verifyUser } from './authActions'

const initialState = {
  loading: false,
  userInfo: null, // for user object
  error: null,
  success: false, // for monitoring the registration process.
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken') 
      localStorage.removeItem('refreshToken')
      state.loading = false
      state.userInfo = null
      state.success = false
      state.error = null
      state.isAuthenticated = false
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
    // Signup user
    .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
    .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = true // registration successful
      })
    .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      //Login user
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = true
        state.isAuthenticated = true
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
    }
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer