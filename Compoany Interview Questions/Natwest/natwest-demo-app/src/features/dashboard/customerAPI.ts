import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerAPIResponse } from "./customerSlice";
import { Customer } from "./customerSlice";

export const fetchCustomers = createAsyncThunk<CustomerAPIResponse, string | undefined>(
    "customers/fetch",
    async (queryParams?) => {
        let customersResponse;
        
        if (queryParams) {
            customersResponse = await fetch(`http://localhost:3000/customers${queryParams}`);
        } else {
            customersResponse = await fetch("http://localhost:3000/customers");
        }

        const customerData = await customersResponse.json();
        return customerData;
    }
);

export const removeCustomers = createAsyncThunk<string, string>(
    "customers/remove",
    async (id) => {
        const customersResponse = await fetch(`http://localhost:3000/customers/${id}`, {
            method: "DELETE"
        });

        const customerData: Customer = await customersResponse.json();
        return customerData.id;
    }
);
