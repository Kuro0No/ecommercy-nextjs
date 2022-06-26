import { createSlice } from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        quantites: 0,
    },

    reducers: {
        add: (state, action) => {
            const check = state.cart.some(item => item.product.uuid === action.payload.product.uuid)
            const index =  state.cart.findIndex(item => item.product.uuid === action.payload.product.uuid)
            index !== -1 && (state.cart[index].quantities = state.cart[index].quantities + action.payload.quantities)

            !check ?  state.cart.push(action.payload) : state.cart

            
        },

    }
})