import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCustomers, removeCustomers } from "./customerAPI";
import { NestedKeys } from "../../utils/utils";
import { 
    Customer, 
    Filter, 
    Sorting, 
    Paging, 
    RootData, 
    CustomerAPIResponse 
} from "./customer.types";

const defaultFilter : Filter = {
    name    : "id" , 
    term    : ""
};

const defaultSorting : Sorting = {
    name: "id", 
    isASC: true
}

const defaultPaging : Paging = {
    currentPage     : 1,
    pageSize        : 4,
};

const initialState: RootData = {
    customers   : [],
    paging      : defaultPaging,
    filter      : defaultFilter,
    sorting     : defaultSorting,
    indicator   : 'idle',
    error       : null
};

export const userTableDisplayer = {
    accHolderName    : 'firstName' as NestedKeys<Customer>,
    accHolderAddress : "contactDetails.address.state" as NestedKeys<Customer>,
    accNumber        : 'accountDetails.accountNumber' as NestedKeys<Customer>,
    accType          : 'accountDetails.accountType' as NestedKeys<Customer>,
    accStatus        : 'accountDetails.status' as NestedKeys<Customer>,
};

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.paging.currentPage = action.payload;
        },
        setFilter : (state,action: PayloadAction<Filter>) => {
            state.filter = {...action.payload};
        },
        setSorting : (state,action : PayloadAction<Sorting>) => {
            state.sorting = {...action.payload}
        },
        setDefaultView : (state) => {
            state.filter  = {...defaultFilter};
            state.sorting = {...defaultSorting};
        }     
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
                const startIndex = (state.paging.currentPage - 1) * state.paging.pageSize;
                if(state.customers.length <= startIndex)
                    state.paging.currentPage -= 1; 
            })
            .addCase(removeCustomers.rejected, (state, action) => {
                state.indicator = 'failure';
                state.error = action.error.message || 'Failed to remove customers';
            });
    },
});

export const { setPage, setFilter, setSorting, setDefaultView } = customersSlice.actions;

export default customersSlice.reducer;