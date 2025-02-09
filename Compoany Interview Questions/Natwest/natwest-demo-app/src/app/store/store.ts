import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import cutomersSlice from "../../features/dashboard/customerSlice";

export const store = configureStore({
    reducer : {
        customers : cutomersSlice
    }
})


export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch 
export type RootType  =  ReturnType<AppStore['getState']>
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootType,
    unknown,
    Action>