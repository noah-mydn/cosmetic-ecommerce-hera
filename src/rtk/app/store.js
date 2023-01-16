import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import makeupReducer from './features/makeUpSlice'


const store = configureStore( {
    reducer : {
        makeup : makeupReducer,
        cart : cartReducer,
    }
})

export default store;