import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCustomers, removeCustomers } from "./customerAPI";
import { RootType } from "../../app/store/store";
import { NestedKeys } from "../../Utils/utils";

interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface ContactDetails {
    email: string;
    phone: string;
    address: Address;
}

interface Identification {
    idType: string;
    idNumber: string;
}

enum AccountType {
    'Savings', 
    'Current'
}

enum Status {
    'Active', 
    'Inactive', 
    'Closed'
}

enum AccountStatus {
    'Operational', 
    'Overdrawn', 
    'Suspended', 
    'Dormant', 
    'Closed'
}

interface AccountDetails {
    accountNumber: string;
    accountType: AccountType; 
    branch: string;
    ifscCode: string;
    balance: number;
    currency: string;
    openedDate: string; 
    status: Status;
    accountStatus: AccountStatus
}

interface Nominee {
    name: string;
    relationship: string;
    contact: string;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string; 
    gender: 'Male' | 'Female' | 'Other';
    contactDetails: ContactDetails;
    identification: Identification;
    accountDetails: AccountDetails;
    kycStatus: 'Verified' | 'Pending' | 'Rejected';
    nominee: Nominee;
}

export interface RootData {
    customers: Customer[];
    indicator: 'loading' | 'success' | 'failure' | 'idle';
    paging: {
        currentPage: number;
        pageSize: number;
    };
    error: string | null;
}

const defaultPaging = {
    currentPage : 1,
    pageSize    : 4,
};

const initialState: RootData = {
    customers   : [],
    paging      : defaultPaging,
    indicator   : 'idle',
    error       : null
};

export const userTableDisplayer = {
    accHolderName   : 'firstName' as NestedKeys<Customer>,
    accHolderAddress: 'contactDetails.address.state' as NestedKeys<Customer>,
    accNumber       : 'accountDetails.accountNumber' as NestedKeys<Customer>,
    accType         : 'accountDetails.accountType' as NestedKeys<Customer>,
    accStatus       : 'accountDetails.status' as NestedKeys<Customer>,
};

export type CustomerAPIResponse = 
  | { 
      first: number | null; 
      prev: number  | null; 
      next: number  | null; 
      last: number  | null; 
      pages: number | null; 
      items: number | null; 
      data: Customer[]; 
    }
  | Customer[];

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.paging.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.indicator = 'loading';
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<CustomerAPIResponse>) => {
                state.indicator = 'success';
                if ('next' in action.payload) {
                    state.customers = action.payload.data;
                    state.paging = {
                        ...state.paging,
                    };
                } else {
                    state.customers = action.payload;
                    state.paging = {
                        ...state.paging,
                    };
                }
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.indicator = 'failure';
                state.error = action.error.message || 'Failed to fetch customers';
            })
            .addCase(removeCustomers.pending, (state) => {
                state.indicator = 'loading';
                state.error = null;
            })
            .addCase(removeCustomers.fulfilled, (state, action: PayloadAction<string>) => {
                state.indicator = 'success';
                state.customers = state.customers.filter((customer) => customer.id !== action.payload);
            })
            .addCase(removeCustomers.rejected, (state, action) => {
                state.indicator = 'failure';
                state.error = action.error.message || 'Failed to remove customers';
            });
    },
});

export const { setPage } = customersSlice.actions;

export default customersSlice.reducer;

export const selectCustomers = (state: RootType) => state.customers;
export const selectIndicator = (state: RootType) => state.customers.indicator;
