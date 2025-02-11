import { configureStore, ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import cutomersSlice from "../features/dashboard/customerSlice";
import { customerApiSlice } from '../features/api/customerApiSlice'
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
    reducer : {
        customers : cutomersSlice,
        [customerApiSlice.reducerPath] : customerApiSlice.reducer
    },
    middleware : getDefaultMiddleWare => {
        return getDefaultMiddleWare()
        .prepend(listenerMiddleware.middleware)
        .concat(customerApiSlice.middleware)
    }
})


export type AppStore    = typeof store;
export type AppDispatch = typeof store.dispatch 
export type RootType    =  ReturnType<typeof store.getState>
export type AppThunk    = ThunkAction<
    void,
    RootType,
    unknown,
    UnknownAction>