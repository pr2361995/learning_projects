import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerAPIResponse } from "./dashboardSlice";

export const fetchCustomers = createAsyncThunk<CustomerAPIResponse,string>("customers/get",async (params?) => {
    let customersDetailResponse;
    if(params)
        customersDetailResponse = await fetch("http://localhost:3000/customers"+params)
    else
        customersDetailResponse = await fetch("http://localhost:3000/customers")
    const customerDetail = await customersDetailResponse.json();
    return customerDetail;
});