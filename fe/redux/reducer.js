import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from '../axiosConfig'
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (arg) => {
        const { category, sort } = arg

        if (category !== 0) {
            const res = await axiosConfig.get(`/list-products/?category=${category}`)
            return res.data.results
        } else {
            const res = await axiosConfig.get(`/list-products/`)
            return res.data.results
        }


    }
)

export const getSortPriceProducts = createAsyncThunk(
    'products/getSortPriceProducts',
    async (arg) => {
        const { category, sort } = arg

        if (category !== 0) {


            if (sort === 'Increase') {
                const res = await axiosConfig.get(`/list-products/?category=${category}&ordering=price`)
                return res.data.results
            } else {
                const res = await axiosConfig.get(`/list-products/?category=${category}&ordering=-price`)
                return res.data.results
            }
        } else {


            if (sort === 'Increase') {
                const res = await axiosConfig.get(`/list-products/?ordering=price`)
                return res.data.results
            } else if (sort === 'Decrease') {
                const res = await axiosConfig.get(`/list-products/?ordering=-price`)
                return res.data.results
            } else {
                const res = await axiosConfig.get(`/list-products/`)
                return res.data.results
            }
        }


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
        },
        [getSortPriceProducts.pending]: (state) => {

            state.loading = true
            state.err = ''

        },
        [getSortPriceProducts.fulfilled]: (state, action) => {

            state.products = action.payload
            state.loading = false
            state.err = ''

        },
        [getSortPriceProducts.rejected]: (state) => {
            state.err = 'failed'
        },
    },
    reducers: {
        getProductFilter: (state, action) => {
            state.push(action.payload)
        },

    }
})