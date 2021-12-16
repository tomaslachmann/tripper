import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";
import PageReducer from "../features/PageSlice";


export default configureStore({
    reducer:{
        user: userReducer,
        page:PageReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
     }),
})