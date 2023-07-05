import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toggleToCart } from './authSlice'







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


export const searchProducts = createAsyncThunk('products/searchProducts', async (data, { rejectWithValue, getState }) => {

    try {
        //create Product
        const res = await axios.get(`/api/product/search-products/?query=${data.query}&page=${data.page}&limit=10`, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})




export const getProduct = createAsyncThunk('products/getProduct', async (data, { rejectWithValue, getState }) => {

    try {
        //get Product
        const res = await axios.get(`/api/product/get-product/${data}`, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

export const getCartProduct = createAsyncThunk('products/getcartProduct', async (data, { rejectWithValue, getState }) => {

    try {
        //get Products
        const res = await axios.get('/api/product/get-cart', { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})


export const getWhishListProducts = createAsyncThunk('products/getWhishListProducts', async (data, { rejectWithValue, getState }) => {

    try {
        //get Products
        const res = await axios.get('/api/product/get-whishlist', { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})



export const addProductToCart = createAsyncThunk('products/addProductToCart', async (data, { rejectWithValue, getState, dispatch }) => {
    try {
        //add Product To Cart
        const { user } = getState().Auth
        const res = await axios.post('/api/product/toggle-product-to-cart', {
            productID: data.id,
            quant: data.quant,
            color: data.color,
            size: data.size
        }, { withCredentials: true })

        dispatch(toggleToCart(res.data))
        return { user, data: res.data }

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})




export const changeProductquant = createAsyncThunk('products/changeProductquant', async ({ action, product }, { rejectWithValue, getState, dispatch }) => {
    try {
        //change Product quant
        if (action == 'increase') {
            const res = await axios.put("/api/product/change-quant", { quant: product.quant + 1, cartProductId: product._id }, { withCredentials: true })
            dispatch(getCartProduct())

            return res.data

        } else {
            const res = await axios.put("/api/product/change-quant", { quant: product.quant - 1, cartProductId: product._id }, { withCredentials: true })
            dispatch(getCartProduct())

            return res.data

        }

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})







const initstate = {
    products: [],
    product: null,
    isLoading: false,
    isLoadingPr: false,
    page: 1,
    pages: 1,
    Product: null,
    cartProducts: [],
    whishlistProducts: [],
    numberOfAvilableProductsInCart: 0,
    subTotal: 0,
    searchproducts: [],
    searchPage: 1,
    searchnumOfPr: 0
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


        //get products
        builder.addCase(searchProducts.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(searchProducts.fulfilled, (state, action) => {

            state.isLoading = false

            state.searchproducts = action.payload.products

            state.searchPage = action.payload.page

            state.searchnumOfPr = action.payload.number_of_products
        })
        builder.addCase(searchProducts.rejected, (state, action) => {

            state.isLoading = false
        })


        //get Cart Product
        builder.addCase(getCartProduct.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getCartProduct.fulfilled, (state, action) => {

            state.isLoading = false

            state.cartProducts = action.payload.cart
            state.numberOfAvilableProductsInCart = action.payload.numberOfAvilableProductsInCart
            state.subTotal = action.payload.subTotal

        })
        builder.addCase(getCartProduct.rejected, (state, action) => {

            state.isLoading = false
        })

        //ADD product to cart
        builder.addCase(getWhishListProducts.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getWhishListProducts.fulfilled, (state, action) => {

            state.isLoading = false

            state.whishlistProducts = action.payload
        })
        builder.addCase(getWhishListProducts.rejected, (state, action) => {

            state.isLoading = false
        })


        //ADD product to cart
        builder.addCase(addProductToCart.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(addProductToCart.fulfilled, (state, action) => {

            state.isLoading = false

            // state.Product = action.payload
            if (action.payload.data.state == 'remove') {

                const newCart = state.cartProducts.filter(e => e.product != action.payload.data.productID)

            } else {
                // state.cartProducts.push(action.payload.data.product)
            }

        })
        builder.addCase(addProductToCart.rejected, (state, action) => {

            state.isLoading = false
        })


    }
})


export default DashboardSlice.reducer
export const { setProduct } = DashboardSlice.actions
