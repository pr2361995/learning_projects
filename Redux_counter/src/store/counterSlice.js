import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name : "counter",
    initialState : {count : 0 , showCounter : true},
    reducers : {
        increment : (state) => ({
            ...state,
            count: state.count+1
        }),
        decrement : (state) => ({
            ...state,
            count: state.count-1
        }),
        increase : (state,action) => ({
            ...state,
            count : state.count + action.payload.value
        }),
        toggleCounter: (state) => ({
            ...state,
            showCounter : !state.showCounter
        })
    }
});

export default counterSlice.reducer;

export const {increase,increment,toggleCounter,decrement} = counterSlice.actions;

