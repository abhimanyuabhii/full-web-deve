import {configureStore} from "@reduxjs/toolkit"
import authReducer from '../features/user/userSlice'
import productReducer from "../features/product/productSlice"
import contactReducer from "../features/contact/ContactSlice"

export const store = configureStore({
    reducer:{
        auth:authReducer,
       product:productReducer,
       contact:contactReducer,
    
    },
})