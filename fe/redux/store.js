import { configureStore } from "@reduxjs/toolkit";
import { productCategorySlice } from "./reducer";

const store = configureStore({
    reducer : {
        products: productCategorySlice.reducer
    }
})

export default store