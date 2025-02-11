import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Customer, CustomerAPIResponse } from '../dashboard/customerSlice';
const baseURL = import.meta.env.VITE_API_URL

export const apiSlice = createApi({
    // generated reducer
    // RTKQ cache data will be stored under state.api
    reducerPath : "customersApi",
    // baseQuery: a function that knows how to fetch data from the server
    // fetchBaseQuery, a small wrapper around the standard fetch() function that handles typical processing of HTTP requests and responses
    // we can pass in the base URL of all future requests
    baseQuery   : fetchBaseQuery({  baseUrl : baseURL}),
    // endpoints: a set of operations that we've defined for interacting with this server. 
    // Endpoints can be queries, which return data for caching, or mutations, which send an update to the server. 
    // The endpoints are defined using a callback function that accepts a builder parameter and returns an object containing endpoint definitions created with builder.query() and builder.mutation()
    endpoints : (builder) => ({
      getCustomers : builder.query<CustomerAPIResponse, string|undefined>({
        query   : (queryParams) => ({ 
            url : queryParams ? `/customers${queryParams}`  : '/customers',
            method : "GET"
        })
      }),
      removeCustomers : builder.mutation<Customer, string>({
        query   : (customerId) => ({ 
            url     : `/customers/${customerId}`,
            method  : "POST",
            body    : {}
        })
      })  
    }),
});

export const { useGetCustomersQuery , useRemoveCustomersMutation } = apiSlice;