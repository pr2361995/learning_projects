import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetResponseType } from "./dashboardSlice";

export const fetchCustomers = createAsyncThunk<GetResponseType,string>("customers/get",async (params) => {
    const customersDetailResponse = await fetch("http://localhost:3000/customers"+params),
    customerDetail = await customersDetailResponse.json();
    return customerDetail;
});