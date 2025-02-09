import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCustomers } from "./getCustomersAPI";
import { RootType } from "../../app/store/store";
import { removeCustomers } from "./removeCustomerAPI";
import { NestedKeys } from "../../Utils/utils";
// import { RootType } from "../../app/store/store";

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
        'Savings' , 
        'Current'
    }
    enum Status {
        'Active' ,
        'Inactive' ,
        'Closed'
    }
    enum AccountStatus {
        'Operational' ,
        'Overdrawn' ,
        'Suspended' ,
        'Dormant' ,
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
        customers : Customer[];
        indicator : 'loading' | 'success' | 'failure' | 'idle';
        paging    : {
            currentPage:number;
            // isPrevious : UnionNumbers;
            // isNext : UnionNumbers;
            pageSize : number;
            totalpages  : number;
            totalItems  : number;
        };
        error     : string;
    }

    export type UnionNumbers = number | null

    export type CustomerAPIResponse = GetResponseType | Customer[];

    export interface GetResponseType {
        first   :   UnionNumbers,
        prev    :   UnionNumbers,
        next    :   UnionNumbers,
        last    :   UnionNumbers,
        pages   :   UnionNumbers,
        items   :   UnionNumbers,
        data    :   Customer[],
    }

    const defaultPaging = {
        currentPage      : 1,
        // isPrevious  : null,
        // isNext      : null,
        pageSize         : 4,
        totalpages       : 0,
        totalItems       : 0
    }

    const initialState : RootData = {
            customers : [],
            paging : defaultPaging,
            indicator : "idle",
            error     : ''
    };

    export const userTableDisplayer : {
        accHolderName    : NestedKeys<Customer>,
        accHolderAddress : NestedKeys<Customer>,
        accNumber        : NestedKeys<Customer>,
        accType          : NestedKeys<Customer>,
        accStatus        : NestedKeys<Customer>
    } = {
        accHolderName    : "firstName",
        accHolderAddress : "contactDetails.address.state",
        accNumber        : "accountDetails.accountNumber",
        accType          : "accountDetails.accountType",
        accStatus        : "accountDetails.status"
    }

const customersSlice = createSlice({
    name : "customers",
    initialState,
    reducers : {
        setPage: (state, action) => {
            state.paging.currentPage = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCustomers.pending,(state) =>{
            state.indicator = 'loading'   
            state.error = ''; 
        })
        .addCase(fetchCustomers.fulfilled,(state,action : PayloadAction<CustomerAPIResponse>)=>{
            state.indicator = "success"
            if('next' in action.payload){
                state.customers = action.payload.data;
                state.paging = {
                    ...state.paging,
                    // isNext : action.payload.next,
                    // isPrevious : action.payload.prev,
                    totalpages : action.payload.pages ? action.payload.pages : 1,
                    totalItems : action.payload.items ? action.payload.items : 0 
                }
            }else{
                state.customers = action.payload;
                state.paging = {
                    ...state.paging,
                    totalpages : Math.ceil(action.payload.length / state.paging.pageSize),
                    totalItems : action.payload.length
                }
            }
        })
        .addCase(fetchCustomers.rejected,(state,action) =>{
            state.indicator = "failure"    
            state.error = action.error.message || "Failed to fetch Customers"
        })
        .addCase(removeCustomers.pending,(state) =>{
            state.indicator = 'loading'   
            state.error = ''; 
        })
        .addCase(removeCustomers.fulfilled,(state,action : PayloadAction<string>)=>{
            state.indicator = "success"
            const newList = state.customers.filter(customer => customer.id !== action.payload);
            state.customers = newList;
        })
        .addCase(removeCustomers.rejected,(state,action) =>{
            state.indicator = "failure"    
            state.error = action.error.message || "Failed to remove Customers"
        })
    } 
})

export const {setPage} = customersSlice.actions;

export default customersSlice.reducer;

export const selectCustomers = (state: RootType) => state.customers
