import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from '../axiosConfig'
export const getComments = createAsyncThunk(
    'comments/getComments',
    async (arg) => {
       
        const res = await axiosConfig.get(`/comments-list/${arg}`)
        return res.data.results
    }
)
export const getRepComments = createAsyncThunk(
    'repComments/getRepComments',
    async (arg) => {
       
        const res = await axiosConfig.get(`/get-rep-comments/${arg}`)
        return res.data.results
    }
)




export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        repComments: [],
        loading: false,
        loading2: false,
        err: '',
    },
    extraReducers: {
        [getComments.pending]: (state) => {
            state.loading = true
            state.err = ''

        },
        [getComments.fulfilled]: (state, action) => {
            state.comments = action.payload
       
            state.loading = false
            state.err = ''

        },
        [getComments.rejected]: (state) => {
            state.err = 'failed to get comments'
        },
        [getRepComments.pending]: (state) => {
            state.loading2 = true
            state.err = ''

        },
        [getRepComments.fulfilled]: (state, action) => {
            state.repComments = action.payload
       
            state.loading2 = false
            state.err = ''

        },
        [getRepComments.rejected]: (state) => {
            state.err = 'failed to get rep comments'
        },
        
    },
    
})