import { createSlice } from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        quantites: 0,
        itemSelected: []
    },

    reducers: {
        add: (state, action) => {
            
            const checkColor = state.cart.some(item => item.color.name === action.payload.color.name)
            
            if (checkColor) {
                const check = state.cart.some(item => item.product.uuid === action.payload.product.uuid)
                const index = state.cart.findIndex(item => item.product.uuid === action.payload.product.uuid && item.color.name === action.payload.color.name)
                index !== -1 && (state.cart[index].quantities = state.cart[index].quantities + action.payload.quantities)
                !check ? state.cart.push(action.payload) : state.cart

            } else {
                state.cart.push(action.payload)
            }


        },
        increase: (state, action) => {
            const index = state.cart.findIndex(item => item.product.uuid === action.payload.product.uuid && item.color.name === action.payload.product.color)
           
            state.cart[index].quantities = state.cart[index].quantities + 1  

        },
        decrease: (state, action) => {
            const index = state.cart.findIndex(item => item.product.uuid === action.payload.product.uuid && item.color.name === action.payload.product.color)
            state.cart[index].quantities = state.cart[index].quantities - 1

        },
        delete: (state, action) => {
            const checkSeleted = state.itemSelected.includes(action.payload.product.key)
            if(checkSeleted) {
                state.itemSelected.filter(item => item !== action.payload.product.key)
            }
            const index = state.cart.findIndex(item => item.product.uuid === action.payload.product.uuid && item.color.name === action.payload.product.color)
            state.cart.splice(index, 1)


        },
        select: (state,action) => {
            state.itemSelected= action.payload
        }
    }
})
