import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Customer } from '../dashboard/customer.types';
const baseURL = import.meta.env.VITE_API_URL


export const customerApiSlice = createApi({
    reducerPath : "customersApi",
    baseQuery   : fetchBaseQuery({  baseUrl : baseURL}),
    endpoints : (builder) => ({
      removeCustomers : builder.mutation<Customer, string>({
            query   : (customerId) => ({ 
                url     : `/customers/${customerId}`,
                method  : "DELETE",
                body    : {}
            }),
            invalidatesTags: ['Customers'],
            // providesTags
        })  
    }),
    tagTypes : ['Customers']
});

export const { useRemoveCustomersMutation } = customerApiSlice;