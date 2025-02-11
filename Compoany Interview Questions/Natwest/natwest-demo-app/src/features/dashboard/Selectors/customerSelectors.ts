import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { getNestedValue, sortByNestedKey } from '../../../utils/utils';
import { RootType } from '../../../app/store';
import { Customer } from '../customer.types';


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
          ? data.toLowerCase().trim().startsWith(filter.term.trim().toLowerCase())
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