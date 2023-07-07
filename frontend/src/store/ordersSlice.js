import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initstate = {
    orders: [],
    number_of_orders: 0,
    page: 1,
    order: null,
}

// const res = await axios.get('/api/order/getUserOrders', { withCredentials: true })

export const getallOrders = createAsyncThunk('orders/getAllOrders', async (data, { rejectWithValue, getState }) => {

    try {
        const res = await axios.get(`/api/order/getallOrders/?page=${data.page}&limit=10`, { withCredentials: true })
        return res.data

    } catch (error) {

        return rejectWithValue(error.response.data.message)
    }

})


export const getOneOrder = createAsyncThunk('orders/getOneOrder', async (id, { rejectWithValue, getState }) => {

    try {
        const res = await axios.get(`/api/order/getOneOrder/${id}`, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})



export const changeOrderStatus = createAsyncThunk('orders/changeOrderStatus', async (data, { rejectWithValue, getState }) => {

    try {
        const res = await axios.put(`/api/order/change-order-status`,data, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

const OrdersSlice = createSlice({
    name: "Auth",
    initialState: initstate,
    reducers: {

    }, extraReducers: (builder) => {


        //get orders
        builder.addCase(getallOrders.fulfilled, (state, action) => {

            // state.isLoading = false
            state.orders = action.payload.orders
            state.page = action.payload.page
            state.number_of_orders = action.payload.number_of_orders
        })


        //get order

        builder.addCase(getOneOrder.fulfilled, (state, action) => {

            // state.isLoading = false
            state.order = action.payload
        })

        //change order stats

        builder.addCase(changeOrderStatus.fulfilled, (state, action) => {

            // state.isLoading = false
            state.order = action.payload
        })
    }
})


export default OrdersSlice.reducer
// export const { setTheme } = OrdersSlice.actions





