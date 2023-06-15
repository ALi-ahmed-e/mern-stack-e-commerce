import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'






export const checkLoggedIn = createAsyncThunk('auth/checkLoggedIn', async (_, { rejectWithValue, getState }) => {

    try {
        //get new access token
        await axios.post(`/api/auth/refreshToken`, null, { withCredentials: true })


        //check if user is logged in 
        const res = await axios.post(`/api/auth/checkLoggedIn`, null, { withCredentials: true })

        // console.log(res.data)

        return res.data

    } catch (error) {

        return rejectWithValue(error.response.data)
    }

})

export const verfAcc = createAsyncThunk('auth/verfiy account', async (userData, { rejectWithValue, getState }) => {

    try {
        //verfiy user
        const res = await axios.get(`/api/auth/verfiyEmail/${userData.userId}/${userData.token}`, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue, getState }) => {

    try {
        //register user
        const res = await axios.post(`/api/auth/register`, userData, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})


export const signIn = createAsyncThunk('auth/signIn', async (userData, { rejectWithValue, getState }) => {

    try {
        //log in user
        const res = await axios.post(`/api/auth/login`, userData, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})



export const editUser = createAsyncThunk('auth/edit User', async (data, { rejectWithValue, getState }) => {

    try {

        const res = await axios.post("/api/user/edit-account", data, { withCredentials: true })


        return res.data

    } catch (error) {

        return rejectWithValue(error.response.data)
    }

})

export const logOut = createAsyncThunk('auth/logOut', async (_, { rejectWithValue, getState }) => {

    try {
        //log out user
        const res = await axios.post(`/api/auth/logout`, {}, { withCredentials: true })
        return res.data.user

    } catch (error) {
        return rejectWithValue(error.response.data.message)

    }

})



export const addProductToWhishlist = createAsyncThunk('auth/addProductToWhishlist', async ({ productID }, { rejectWithValue, getState, dispatch }) => {
    try {
        //add Product To Cart
        const res = await axios.put('/api/product/add-product-whishlist', { productID }, { withCredentials: true })

        return { productID, res: res.data }

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})




const initstate = {
    user: null,
    isLoading: false,
    error: {
        src: null,
        err: null
    },
    verfiy_email: {
        src: null,
        err: null,
    }
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState: initstate,
    reducers: {
        toggleToCart: (state, action) => {
            // console.log(state.user.cart.some(product => product.product == action.payload.product))
            if (action.payload.state == 'remove') {

                const newCart = state.user.cart.filter(e => e.product != action.payload.productID)

                state.user.cart = newCart

            } else {
                state.user.cart.push(action.payload.product)
            }
        },
    },
    extraReducers: (builder) => {
        //login
        builder.addCase(signIn.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(signIn.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(signIn.rejected, (state, action) => {

            state.isLoading = false
            if (action.payload == 'your email not verfiyed we sent link to your email address') {
                state.verfiy_email.src = 'login'
                state.verfiy_email.err = action.payload
            } else {
                state.error.src = 'login'
                state.error.err = action.payload
            }



        })
        //register
        builder.addCase(register.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {

            state.isLoading = false
            // state.user = action.payload
            state.verfiy_email.src = 'register'
            state.verfiy_email.err = action.payload
        })
        builder.addCase(register.rejected, (state, action) => {

            state.isLoading = false
            // state.user = action.payload
            state.error.src = 'login'
            state.error.err = action.payload
        })
        //verfAccount and login
        builder.addCase(verfAcc.pending, (state, action) => {

            // state.isLoading = true
        })
        builder.addCase(verfAcc.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(verfAcc.rejected, (state, action) => {

            state.isLoading = false
            state.error.src = 'verfAcc'
            state.error.err = action.payload
        })
        //checkLoggedIn
        builder.addCase(checkLoggedIn.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(checkLoggedIn.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(checkLoggedIn.rejected, (state, action) => {

            state.isLoading = false
        })
        //logout
        builder.addCase(logOut.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(logOut.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = null
        })
        builder.addCase(logOut.rejected, (state, action) => {

            state.isLoading = false
            state.error.src = 'logout'
            state.error.err = action.payload
        })
        //edit accont
        builder.addCase(editUser.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(editUser.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(editUser.rejected, (state, action) => {

            state.isLoading = false
            state.error.err = action.payload
        })
        //addProductToWhishlist
        builder.addCase(addProductToWhishlist.fulfilled, (state, action) => {

            state.isLoading = false
            if (action.payload.res == 'added succesfuly') {

                state.user.whishlist.push(action.payload.productID)
            } else {
                const newWhishlist = state.user.whishlist.filter(wp => wp != action.payload.productID)
                state.user.whishlist = newWhishlist
            }
        })
        builder.addCase(addProductToWhishlist.rejected, (state, action) => {

            state.isLoading = false
            state.error.err = action.payload
        })

    }
})


export default AuthSlice.reducer
export const { toggleToCart } = AuthSlice.actions
