import { createSlice } from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        quantites: 0,
        loading: false,
        err: '',
    },

    reducers: {
        add: (state, action) => {
            const check = state.cart.some(item => item.product.uuid === action.payload.product.uuid)
            const index = state.cart.findIndex(item => item.product.uuid === action.payload.product.uuid)
            !check ?  state.cart.push(action.payload) : state.cart[index].quantities + action.payload.quantites
            
        },

    }
})
