import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootType } from "../../app/store";
import { Customer, CustomerAPIResponse } from "./customer.types";
// import { selectIndicator } from "./Selectors/customerSelectors";
const baseURL = import.meta.env.VITE_API_URL

export const fetchCustomers = createAsyncThunk<CustomerAPIResponse, string | undefined,{state : RootType}>(
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
    // ,
    // {
    //     condition(_, thunkApi) {
    //         const pendingStatus = selectIndicator(thunkApi.getState())
    //         if (pendingStatus !== 'idle') {
    //             return false;
    //         }
    //         return true;
    //     }
    // }
);

export const removeCustomers = createAsyncThunk<string, string>(
    "customers/remove",
    async (id) => {
        const customersResponse = await fetch(`${baseURL}/customers/${id}`, {
            method: "DELETE"
        });

        const customerData: Customer = await customersResponse.json();
        return customerData.id;
    }
);
