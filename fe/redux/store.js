import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./cartReducer";
import { productCategorySlice } from "./reducer";

const store = configureStore({
    reducer : {
        products: productCategorySlice.reducer,
        cart: CartSlice.reducer
    }
})

export default store