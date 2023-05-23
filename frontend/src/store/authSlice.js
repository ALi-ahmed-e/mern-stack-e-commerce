import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'






export const checkLoggedIn = createAsyncThunk('auth/checkLoggedIn', async (_, { rejectWithValue, getState }) => {

    try {
        //get new access token
        await axios.post(`/api/auth/refreshToken`, null, { withCredentials: true })


        //check if user is logged in 
        const res = await axios.post(`/api/auth/checkLoggedIn`, null, { withCredentials: true })

        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
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


export const logOut = createAsyncThunk('auth/logOut', async (_, { rejectWithValue, getState }) => {

    try {
        //log out user
        const res = await axios.post(`/api/auth/logout`, {}, { withCredentials: true })
        return res.data.user

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
        loginSuccess: (state, action) => {
            state.user = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
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

    }
})


export default AuthSlice.reducer
export const { loginSuccess, setUser } = AuthSlice.actions
