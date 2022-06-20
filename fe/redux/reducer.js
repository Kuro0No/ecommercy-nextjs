import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from '../axiosConfig'
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (arg) => {
        const { category, sort,color } = arg
        const sortPrice = (!sort || sort == 'None') ? null : (sort === 'decrease' ? '-price' : 'price')

        const linkCategory = category !== 0 ? `category=${category}` : ''
        const linkSort = sort && sort !== 'None' ? `&ordering=${sortPrice}` : ''
        const linkColor = color.length>0 ? `&color=${color.join('&color=')}` : ''
        const a = [linkCategory,linkColor,linkSort]


        // const a = Object.keys(arg).filter(key => arg[key] !== null && arg[key] !== 0)
        // console.log(`/list-products/?${category !== 0 ? `category=${category}` : ''}${sort && sortPrice ? `&ordering=${sortPrice}` : ''}`)
        
        const res = await axiosConfig.get(`/list-products/?${linkCategory}${linkSort}${linkColor}`)
        return res.data.results
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
        
    },
    reducers: {
        getProductFilter: (state, action) => {
            state.push(action.payload)
        },

    }
})