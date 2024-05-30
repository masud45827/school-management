import { configureStore } from "@reduxjs/toolkit";
import loginreducer from "./LoginSlice";
export default configureStore({
    reducer:{
        login: loginreducer
    },
})