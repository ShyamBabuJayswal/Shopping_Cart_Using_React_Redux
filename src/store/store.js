import { configureStore } from "@reduxjs/toolkit";

import cartReducer from './cartSlice';
import Products from "../components/Products";
import productReducer from './productSlice';

const store=configureStore({
    reducer:{
        cart: cartReducer,
        Product:productReducer,

    }
})
export default store;