import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from '../axiosConfig'
export const getComments = createAsyncThunk(
    'comments/getComments',
    async (arg) => {
       
        const res = await axiosConfig.get(`/comments-list/${arg}`)
        return res.data.results
    }
)




export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        loading: false,
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
            state.err = 'failed'
        },
        
    },
    
})