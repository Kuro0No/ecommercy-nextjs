import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from '../axiosConfig'
import jwt_decode from "jwt-decode";


export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (arg) => {
        const res = await axiosConfig.post(`/token/`, arg)
        return res.data
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        loading: false,
        err: '' 
    },
    extraReducers:{
        [userLogin.pending]: (state) => {
            state.loading = true
            state.err = ''      
        },
        [userLogin.fulfilled]: (state, action) => {
            state.currentUser =jwt_decode(action.payload.access)
            localStorage.setItem('authToken', action.payload.access)
            state.loading = false
            state.err = ''

        },
        [userLogin.rejected]: (state) => {
            state.err = 'failed to login'
        },
    },
    reducers: {
        login: (state,action) => {
            state.currentUser = action.payload
            console.log(action.payload)
        }}
    
    
})