import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'




export const editProduct = createAsyncThunk('products/editProduct', async (data, { rejectWithValue, getState }) => {

    try {
        //edit Product
        const res = await axios.put('/api/product/edit-product', data, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})


export const DeleteProduct = createAsyncThunk('products/DeleteProduct', async (data, { rejectWithValue, getState }) => {

    try {
        //create Product
        const res = await axios.delete(`/api/product/delete-product/${data}`, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})



export const getDashboardData = createAsyncThunk('dashboard/getDashboardData', async (_, { rejectWithValue, getState }) => {

    try {
        //get Dashboard Data
        const res = await axios.get('/api/dashboard/getData', { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})



export const getAdmins = createAsyncThunk('dashboard/getAdmins', async (_, { rejectWithValue, getState }) => {

    try {
        //get Dashboard Data
        const res = await axios.get('/api/dashboard/getAdmins', { withCredentials: true })

        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})


export const changeAdmins = createAsyncThunk('dashboard/changeAdmins', async (data, { rejectWithValue, getState }) => {

    try {
        //change admins
        const res = await axios.put('/api/dashboard/changeAdmins',data, { withCredentials: true })

        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})



export const createProduct = createAsyncThunk('products/createProduct', async (data, { rejectWithValue, getState }) => {

    try {
        //create Product
        const res = await axios.post('/api/product/create-product', data, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

export const getProducts = createAsyncThunk('dashboard/getProducts', async (data, { rejectWithValue, getState }) => {

    try {
        //create Product
        const res = await axios.get(`/api/product/get-products/?page=${data.page}&limit=10`, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})


export const editSite = createAsyncThunk('dashboard/editSite', async (data, { rejectWithValue, getState }) => {

    try {
        //create Product
        const res = await axios.post(`/api/dashboard/editSite`, data, { withCredentials: true })
     
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})



export const getSiteData = createAsyncThunk('dashboard/getSiteData', async (data, { rejectWithValue, getState }) => {

    try {
        //create Product
        const res = await axios.post(`/api/dashboard/getSiteData/${data}`, data, { withCredentials: true })
     
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})





const initstate = {
    data: null,
    isLoading: false,
    isLoadingPr: false,
    page: 1,
    number_of_products: 0,
    products: [],
    dbData:null,
    admins:[]
}

const DashboardSlice = createSlice({
    name: "Auth",
    initialState: initstate,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        //get dashboard data
        builder.addCase(getDashboardData.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getDashboardData.fulfilled, (state, action) => {
            state.isLoading = false

            state.data = action.payload

        })
        builder.addCase(getDashboardData.rejected, (state, action) => {

            state.isLoading = false
        })
        //change admins
        builder.addCase(changeAdmins.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(changeAdmins.fulfilled, (state, action) => {
            state.isLoading = false

            state.admins = action.payload

        })
        builder.addCase(changeAdmins.rejected, (state, action) => {

            state.isLoading = false
        })
        //get admins
        builder.addCase(getAdmins.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getAdmins.fulfilled, (state, action) => {
            state.isLoading = false

            state.admins = action.payload

        })
        builder.addCase(getAdmins.rejected, (state, action) => {

            state.isLoading = false
        })
        //create product
        builder.addCase(createProduct.pending, (state, action) => {

            state.isLoadingPr = true
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {

            state.isLoadingPr = false
            state.products.push(action.payload)
        })
        builder.addCase(createProduct.rejected, (state, action) => {

            state.isLoadingPr = false
        })
        //get products
        builder.addCase(getProducts.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {

            state.isLoading = false

            state.page = action.payload.page

            state.number_of_products = action.payload.number_of_products

            state.products = action.payload.products
        })
        builder.addCase(getProducts.rejected, (state, action) => {

            state.isLoading = false
        }) //edit product
        builder.addCase(editProduct.pending, (state, action) => {

            state.isLoadingPr = true
        })
        builder.addCase(editProduct.fulfilled, (state, action) => {

            state.isLoadingPr = false

            const index = state.products.findIndex(obj => obj._id === action.payload._id);

            if (index !== -1) {
                state.products.splice(index, 1, action.payload);
            }

            // .push(action.payload)
        })
        builder.addCase(editProduct.rejected, (state, action) => {

            state.isLoadingPr = false
        })
        //Delete Product
        builder.addCase(DeleteProduct.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(DeleteProduct.fulfilled, (state, action) => {

            state.isLoading = false
            state.products.splice(state.products.findIndex(pst => pst._id == action.payload._id), 1)
        })
        builder.addCase(DeleteProduct.rejected, (state, action) => {

            state.isLoading = false
        })
        //editSite
        builder.addCase(editSite.rejected, (state, action) => {

            state.isLoading = false
        }) //Delete Product
        builder.addCase(editSite.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(editSite.fulfilled, (state, action) => {

            state.isLoading = false
            state.dbData = action.payload
        })
        //getSiteData
        builder.addCase(getSiteData.rejected, (state, action) => {

            state.isLoading = false
        }) //Delete Product
        builder.addCase(getSiteData.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getSiteData.fulfilled, (state, action) => {

            state.isLoading = false
            state.dbData = action.payload
        })
    }
})


export default DashboardSlice.reducer
// export const { loginSuccess, setUser } = DashboardSlice.actions
