import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false, 
  isAuthenticated: false,
  userProfileDetails: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, {payload}) => {
      localStorage.setItem('accessToken', payload.access)
      localStorage.setItem('refreshToken', payload.refresh)
      state.loading = false
      state.success = true
      state.isAuthenticated = true
    },
    setUserProfileDetails: (state, {payload}) => {
      state.userProfileDetails = payload
    },
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
})

export const { logout, setCredentials, setTokens, setUserProfileDetails } = authSlice.actions
export default authSlice.reducer