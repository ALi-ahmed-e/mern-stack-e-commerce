import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import dashboardReducer from './dashboardSlice'
import productsReducer from './productsSlice'
import themeReducer from './themeSlice'


const  store = configureStore({
    reducer:{Auth:authReducer,Dashboard:dashboardReducer,Products:productsReducer,Theme:themeReducer}
})

export default store;