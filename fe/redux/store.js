import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./cartReducer";
import { checkoutSlice } from "./checkoutReducer";
import { commentsSlice } from "./commentsReducer";
import { productCategorySlice } from "./reducer";
import { userSlice } from "./userReducer";

const store = configureStore({
    reducer : {
        products: productCategorySlice.reducer,
        cart: CartSlice.reducer,
        comments: commentsSlice.reducer,
        user: userSlice.reducer,
        itemSelected: checkoutSlice.reducer,
    }
})

export default store