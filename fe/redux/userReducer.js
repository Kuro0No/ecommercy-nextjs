import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from '../axiosConfig'


export const getUser = createAsyncThunk(
    'user/getUser',
    async (arg) => {
       
        const res = await axiosConfig.get(`/get-rep-comments/${arg}`)
        return res.data.results
    }
)


export const userSlice = createSlice({
    name: 'comments',
    initialState: {
       user: {}
    },
    extraReducers:{
        [getComments.pending]: (state) => {
            state.loading = true
            state.err = ''

        },
        [getComments.fulfilled]: (state, action) => {
            state.user = action.payload
       
            state.loading = false
            state.err = ''

        },
        [getComments.rejected]: (state) => {
            state.err = 'failed to get comments'
        },
    }
    
})