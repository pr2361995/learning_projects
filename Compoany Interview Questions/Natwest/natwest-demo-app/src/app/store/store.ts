import { configureStore, ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import cutomersSlice from "../../features/dashboard/customerSlice";

export const store = configureStore({
    reducer : {
        customers : cutomersSlice
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