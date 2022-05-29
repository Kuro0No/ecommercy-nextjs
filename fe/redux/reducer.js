import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from '../axiosConfig'
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (arg) => {
        if (arg !== 0) {
            const res = await axiosConfig.get(`/list-products/?category=${arg}`)
            return res.data.results
        } else {
            const res = await axiosConfig.get(`/list-products/`)
            return res.data.results
        }

        // if (!arg || arg === 'all') {
        //     const res = await axiosConfig.get('/list-products/')
        //     return res.data.results

        // } else if (arg === 'mobile') {
        //     const res = await axiosConfig.get('/list-products/?category=2')
        //     return res.data.results

        // } else if (arg === 'clothing') {
        //     const res = await axiosConfig.get('/list-products/?category=4')
        //     return res.data.results


        // } else if (arg === 'computer') {
        //     const res = await axiosConfig.get('/list-products/?category=3')
        //     return res.data.results


        // } else if (arg === 'shoes') {
        //     const res = await axiosConfig.get('/list-products/?category=1')
        //     return res.data.results

        // }

    }
)




export const productCategorySlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        err: '',
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.loading = true
            state.err = ''

        },
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload
            state.loading = false
            state.err = ''

        },
        [getProducts.rejected]: (state) => {
            state.err = 'failed'
        }
    },
    reducers: {
        getProductFilter: (state, action) => {
            state.push(action.payload)
        },

    }
})