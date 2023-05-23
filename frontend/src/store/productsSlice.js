import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'







export const createProduct = createAsyncThunk('products/createProduct', async (data, { rejectWithValue, getState }) => {

    try {
        //create Product
        const res = await axios.post('/api/product/create-product', data, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})



export const getProducts = createAsyncThunk('products/getProducts', async (data, { rejectWithValue, getState }) => {

    try {
        //create Product
        const res = await axios.get(`/api/product/get-products/?page=${data.page}&limit=10`, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

 

export const getProduct = createAsyncThunk('products/getProduct', async (data, { rejectWithValue, getState }) => {

    try {
        //get Product
        const res = await axios.get(`/api/product/get-product/${data}`, { withCredentials: true })
      console.log(res.data)
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

 



const initstate = {
    products: [],
    product: null,
    isLoading: false,
    isLoadingPr: false,
    page:1,
    pages:1,
    Product:null
}

const DashboardSlice = createSlice({
    name: "Auth",
    initialState: initstate,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },

    },
    extraReducers: (builder) => {
       
       
        //get products
        builder.addCase(getProducts.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {

            state.isLoading = false
            state.products = action.payload.products
        })
        builder.addCase(getProducts.rejected, (state, action) => {

            state.isLoading = false
        })
       
       
       
        //get products
        builder.addCase(getProduct.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {

            state.isLoading = false
            state.Product = action.payload
        })
        builder.addCase(getProduct.rejected, (state, action) => {

            state.isLoading = false
        })
       

    }
})


export default DashboardSlice.reducer
export const { setProduct } = DashboardSlice.actions
