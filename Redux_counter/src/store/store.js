import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";

const appStore = configureStore({
    reducer : {
        counter : counterReducer,
        authentication : authReducer
    }
});

export default appStore;