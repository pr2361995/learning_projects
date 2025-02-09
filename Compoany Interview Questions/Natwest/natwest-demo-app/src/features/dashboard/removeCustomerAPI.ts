import { createAsyncThunk } from "@reduxjs/toolkit";
import { Customer } from "./dashboardSlice";

export const removeCustomers = createAsyncThunk<string,string>("customers/remove",async (id) => {
    const customersDetailResponse = await fetch(`http://localhost:3000/customers/${id}`,{
        method : "DELETE"
    }),
    customerDetail : Customer = await customersDetailResponse.json();
    return customerDetail.id;
});