import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./cartReducer";
import { commentsSlice } from "./commentsReducer";
import { productCategorySlice } from "./reducer";

const store = configureStore({
    reducer : {
        products: productCategorySlice.reducer,
        cart: CartSlice.reducer,
        comments: commentsSlice.reducer,
    }
})

export default store