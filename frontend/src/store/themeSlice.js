import { createSlice } from '@reduxjs/toolkit'


const initstate = {
    theme: localStorage.getItem('theme')?localStorage.getItem('theme'):'dark'
}

const ThemeSlice = createSlice({
    name: "Auth",
    initialState: initstate,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        },

    }
})


export default ThemeSlice.reducer
export const { setTheme } = ThemeSlice.actions
