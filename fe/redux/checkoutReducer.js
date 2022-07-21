import { createSlice, } from "@reduxjs/toolkit";


export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        itemSelected: [],
        
    },
    reducers: {
        add: (state,action) => {
            state.itemSelected= action.payload
        }
        
    }
})
