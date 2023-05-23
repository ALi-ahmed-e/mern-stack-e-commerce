import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import dashboardReducer from './dashboardSlice'
import productsReducer from './productsSlice'


const  store = configureStore({
    reducer:{Auth:authReducer,Dashboard:dashboardReducer,Products:productsReducer}
})

export default store;