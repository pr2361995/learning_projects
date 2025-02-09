import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerAPIResponse } from "./customerSlice";
import { Customer } from "./customerSlice";
const baseURL = import.meta.env.VITE_API_URL
export const fetchCustomers = createAsyncThunk<CustomerAPIResponse, string | undefined>(
    "customers/fetch",
    async (queryParams?) => {
        let customersResponse;
        
        if (queryParams) {
            customersResponse = await fetch(`${baseURL}/customers${queryParams}`);
        } else {
            customersResponse = await fetch(`${baseURL}/customers`);
        }

        const customerData = await customersResponse.json();
        return customerData;
    }
);

export const removeCustomers = createAsyncThunk<string, string>(
    "customers/remove",
    async (id) => {
        const customersResponse = await fetch(`${baseURL}/customer/${id}`, {
            method: "DELETE"
        });

        const customerData: Customer = await customersResponse.json();
        return customerData.id;
    }
);
