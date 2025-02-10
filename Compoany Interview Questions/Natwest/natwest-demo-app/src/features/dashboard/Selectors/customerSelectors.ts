import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { Customer } from '../customerSlice';
import { getNestedValue, sortByNestedKey } from '../../../Utils/utils';
import { RootType } from '../../../app/store/store';


export const selectCustomers = (state: RootType) => state.customers;
export const selectIndicator = (state: RootType) => state.customers.indicator;

export const selectAllCustomers = createDraftSafeSelector(
  [selectCustomers],
  (customersState) => customersState.customers
);

export const selectFilterOptions = createDraftSafeSelector(
  [selectCustomers],
  (customersState) => customersState.filter 
);

export const selectSortOptions = createDraftSafeSelector(
  [selectCustomers],
  (customersState) => customersState.sorting 
);

export const selectFilteredCustomers = createDraftSafeSelector(
  [selectAllCustomers, selectFilterOptions],
  (customers, filter) => {
    return customers.filter((customer) => {
      const data = getNestedValue<Customer>(customer, filter.name);
      return typeof data === "string"
        ? filter.term.trim() !== ""
          ? data.toLowerCase().trim().includes(filter.term.trim().toLowerCase())
          : true
        : false;
    });
  }
);

export const selectSortedCustomers = createDraftSafeSelector(
  [selectFilteredCustomers, selectSortOptions],
  (filteredCustomers, sortByColumn) => {
    const sortedCustomer = sortByNestedKey<Customer>(filteredCustomers, sortByColumn.name, sortByColumn.isASC);
    return sortedCustomer;
  }
);