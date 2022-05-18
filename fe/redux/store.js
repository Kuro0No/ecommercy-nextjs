import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./reducer";

const store = configureStore({
    reducer : {
        category: categorySlice
    }
})

export default store