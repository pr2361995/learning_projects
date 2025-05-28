import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {isAuthenticated : false},
    reducers : {
        login : (state,action) => ({
            ...state,
            isAuthenticated : true
        }),
        logOut : (state,action) => ({
            ...state,
            isAuthenticated : false
        }),
    }
})

export default authSlice.reducer;
export const {login,logOut} = authSlice.actions;