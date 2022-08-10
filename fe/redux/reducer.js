import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from '../axiosConfig'
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (arg) => {
        const { category, sort,color } = arg
        const sortPrice = (!sort || sort == 'None') ? null : (sort === 'Decrease' ? '-price' : 'price')

        const linkCategory = category !== 0 ? `category=${category}` : ''
        const linkSort = sort && sort !== 'None' ? `&ordering=${sortPrice}` : ''
        const linkColor = color.length>0 ? `&color=${color.join('&color=')}` : ''
        
        const res = await axiosConfig.get(`/list-products/?${linkCategory}${linkSort}${linkColor}`)
        return res.data.results
    }
)

export const getSearchProducts = createAsyncThunk(
    'products/getSearchProducts',
    async (q) => {
        const res = await axiosConfig.get(`/list-products/?search=${q}`)
        return res.data.results
       
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
        [getSearchProducts.pending]: (state) => {
            state.loading = true
            state.err = ''

        },
        [getSearchProducts.fulfilled]: (state, action) => {
            state.products = action.payload
            state.loading = false
            state.err = ''
           
        },
        [getSearchProducts.rejected]: (state) => {
            state.err = 'failed'
        },
        
    },

})