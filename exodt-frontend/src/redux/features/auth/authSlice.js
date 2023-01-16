import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'

const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  error: null,
  success: false, // for monitoring the registration process.
  accessToken: null,
  refreshToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
        state.userInfo = payload
        state.accessToken = payload.accessToken
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })

    }
})

export default authSlice.reducer