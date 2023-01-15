import { createSlice } from "@reduxjs/toolkit";

const authSlice  = createSlice({
    name: 'auth',
    initialState: {
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
        isAuthenticated: null,
        user: null,
    },
    reducers :{
        setCredentials: (state, action) = {
            
        }
    }
});