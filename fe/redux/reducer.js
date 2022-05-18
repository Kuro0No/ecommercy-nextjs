import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: 'search',
    initialState: {
        search: '',
       

    },
    reducers :{
        searchFilterChange : (state,action) => {
            state.search = action.payload

        },
        
    }
})

export const categorySlice = createSlice({
    name: 'category',
    initialState: [],
    reducers :{
        categoryFilterChange : (state,action) => {
            state.push(action.payload)
        },
        
    }
})